# khoutsider

- a khinsider album batch song finder -- saves download links inside download.txt
- you can feed it to Motrix or your download manager of choice

# before using
- you need bun installed on your computer
- run `bun i` in the root directory

# create executable
- `bun build ./src/cli.ts --compile --outfile khoutsider`

# using
- if youve created an executable run (add .exe on windows)

   `khoutsider --url https://downloads.khinsider.com/game-soundtracks/album/[ album to be downloaded ]`
- else run

  `bun run .\index.ts --url https://downloads.khinsider.com/game-soundtracks/album/[ album to be downloaded ]`
- use a download manager to feed download.txt links
