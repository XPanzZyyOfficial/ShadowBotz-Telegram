
const axios = require("axios");

module.exports = {
  name: "gimage",
  alias: ["image", "gambar"],
  desc: "Cari gambar dari Google (tanpa SafeSearch)",
  type: "search",
  start: async (client, m, { text }) => {
    if (!text) return m.reply("Kirimkan keyword untuk mencari gambar.Contoh: .gimage kucing lucu");

    const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(text)}&safe=off`;
    try {
      const { data } = await axios.get(searchUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36"
        }
      });

      const imgUrls = [...data.matchAll(/"ou":"(.*?)"/g)].map((m) => m[1]);
      if (imgUrls.length === 0) return m.reply("❌ Tidak ditemukan gambar.");

      let randomImage = imgUrls[Math.floor(Math.random() * imgUrls.length)];
      client.sendFile(m.from, randomImage, "", m, `🔎 Hasil gambar untuk: ${text}`);
    } catch (err) {
      console.error(err);
      m.reply("❌ Terjadi kesalahan saat mengambil gambar.");
    }
  }
};
