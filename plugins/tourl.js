const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

module.exports = {
  name: "tourl",
  alias: ["catbox"],
  desc: "Upload media ke Catbox dan dapatkan URL",
  type: "tools",
  start: async (client, m) => {
    if (!m.quoted || !m.quoted.mediaType) {
      return m.reply("Balas pesan media (gambar/video/dokumen) untuk diunggah.");
    }

    let media = await m.quoted.download();
    let bufferPath = "./temp_upload_file";
    fs.writeFileSync(bufferPath, media);

    try {
      let form = new FormData();
      form.append("reqtype", "fileupload");
      form.append("fileToUpload", fs.createReadStream(bufferPath));

      let res = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: form.getHeaders()
      });

      fs.unlinkSync(bufferPath);
      m.reply(`✅ URL berhasil dibuat:
${res.data}`);
    } catch (err) {
      fs.unlinkSync(bufferPath);
      m.reply("❌ Gagal mengunggah ke Catbox.");
    }
  },
};
