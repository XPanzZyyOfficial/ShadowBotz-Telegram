
const axios = require("axios");

module.exports = {
  name: "pinterest",
  alias: ["pin"],
  desc: "Cari gambar atau video dari Pinterest",
  type: "search",
  start: async (client, m, { text }) => {
    if (!text) return m.reply("Masukkan kata kunci pencarian.
Contoh: .pinterest aesthetic");

    try {
      const res = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${encodeURIComponent(text)}&data=%7B%7D`);
      const data = JSON.stringify(res.data);
      const media = [...data.matchAll(/"url":"(https:\/\/i\.pinimg\.com.*?)"/g)].map(m => m[1].replace(/\\u002F/g, "/"));

      if (media.length === 0) return m.reply("❌ Tidak ada hasil ditemukan.");

      let result = media[Math.floor(Math.random() * media.length)];
      client.sendFile(m.from, result, "", m, `📌 Hasil dari Pinterest: ${text}`);
    } catch (e) {
      m.reply("❌ Gagal mengambil data dari Pinterest.");
    }
  }
};
