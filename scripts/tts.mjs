import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Spoken text; tech terms spelled phonetically so the Polish voice reads them naturally.
const lines = [
  "Napisałeś kod, coś zepsułeś i nie pamiętasz, jak było wcześniej. Git rozwiązuje dokładnie ten problem. Zobaczmy, jak działa.",
  "Git to system kontroli wersji. Zapamiętuje historię projektu: każdą zmianę, kto ją zrobił i kiedy. Stworzył go Linus Torvalds w 2005 roku.",
  "Pliki w Gicie przechodzą przez trzy miejsca: katalog roboczy, gdzie edytujesz, poczekalnię, czyli stejdżing, i repozytorium z historią.",
  "Komendą git ed wrzucasz zmiany do poczekalni, a git komit zapisuje je jako migawkę. Każdy komit ma unikalny identyfikator i opis.",
  "Komity tworzą łańcuch. Każdy wskazuje na poprzedni, więc zawsze możesz wrócić do dowolnego momentu w historii.",
  "Gałąź to po prostu wskaźnik na komit. Tworzysz nową gałąź, rozwijasz na niej funkcję, a główna wersja zostaje nietknięta.",
  "Gdy funkcja jest gotowa, łączysz gałęzie komendą git merdż. Jeśli dwie osoby zmieniły tę samą linię, Git zgłosi konflikt do rozwiązania.",
  "Repozytorium może mieć kopię na serwerze, na przykład na GitHabie. Git pusz wysyła twoje komity, a git pul pobiera zmiany innych.",
  "Git jest rozproszony: każdy ma pełną kopię historii na swoim komputerze. Możesz pracować bez internetu, a serwer nie jest jedynym źródłem prawdy.",
  "Komity, gałęzie, merdż i pusz. To cztery filary Gita. Spróbuj sam: wpisz git init w nowym folderze i zrób swój pierwszy komit.",
];

const only = process.argv[2] ? Number(process.argv[2]) : null;
const outRoot = "assets/audio";
mkdirSync(outRoot, { recursive: true });

for (let i = 0; i < lines.length; i++) {
  const n = String(i + 1).padStart(2, "0");
  if (only && only !== i + 1) continue;
  const tmp = join(outRoot, `tmp-${n}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata("pl-PL-MarekNeural", OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
  });
  await tts.toFile(tmp, lines[i], { rate: "+10%" });
  tts.close();
  for (const f of readdirSync(tmp)) {
    const ext = f.endsWith(".mp3") ? "mp3" : "json";
    renameSync(join(tmp, f), join(outRoot, `vo-${n}.${ext}`));
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`vo-${n} ok`, existsSync(join(outRoot, `vo-${n}.mp3`)));
}
