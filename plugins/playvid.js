const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: "playvid",
  alias: ["ytvideo", "ytplay"],
  desc: "Cari dan unduh video dari YouTube",
  type: "downloader",
  start: async (client, m, { text }) => {
    if (!text) return m.reply("Masukkan judul lagu atau video. Contoh: .playvid never gonna give you up");

    let search = await yts(text);
    let vid = search.videos[0];
    if (!vid) return m.reply("❌ Video tidak ditemukan.");

    let url = vid.url;
    let info = await ytdl.getInfo(url);
    let format = ytdl.chooseFormat(info.formats, { quality: "18" });

    client.sendFile(m.from, format.url, "video.mp4", `🎬 *${vid.title}*

📺 ${vid.url}`, m);
  }
};
