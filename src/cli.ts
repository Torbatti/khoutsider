// 
// USAGE(AABI) 8/12/2025: khoutsider --url [url]
// 
// NOTE(AABI): learn more about cheerio -> https://cheerio.js.org/docs/intro 
// NOTE(AABI): learn more about bun argv -> https://bun.com/guides/process/argv 
import * as cheerio from 'cheerio';
import { parseArgs } from "util";

async function main() {

    // console.log("Hello via Bun!"); // <3 bun

    // NOTE(AABI): recive/parse cli args
    const { values, positionals } = parseArgs({
        args: Bun.argv,
        options: {
            url: {
                type: 'string',
            },
        },
        strict: true,
        allowPositionals: true,
    });

    if (values.url == null) {
        console.log("exit err: wrong format , url is not provided");
        console.log("usage: khoutsider --url [url]");
        return;
    }

    if (!values.url.includes("khinsider.com")) {
        console.log("exit err: invalid url link");
        console.log("usage: khoutsider --url [url]");
        return;
    }

    // NOTE(AABI): Download url html body 
    const main_url = values.url.toString();
    const url_origin = new URL("blob:" + main_url).origin;

    const main_response = await fetch(main_url);

    // NOTE(AABI): extracting music link elements 
    const $main = cheerio.load(await main_response.text())
    const $table_links = $main(".playlistDownloadSong a");

    // TODO(AABI): deleting old download file
    // await Bun.file("download.txt").delete();

    // NOTE(AABI): init file writer
    const file = Bun.file("download.txt");
    const writer = file.writer();

    // NOTE(AABI): go to every individual song link and extract download links 
    let i = 0
    while (i < $table_links.length) {
        const song_url = url_origin.toString() + $table_links[i]?.attribs.href?.toString();

        const song_response = await fetch(song_url);

        // NOTE(AABI): extracting download link elements 
        const $ = cheerio.load(await song_response.text())
        const $audio = $('audio#audio');
        const audio_src = $audio.attr()?.src;
        if (audio_src != undefined){
            console.log(audio_src?.toString())
            writer.write(audio_src?.toString() + "\n")
        }
        
        i++
    }

    // NOTE(AABI): Dont forget to flush
    writer.end();
}

await main();