const { default: translate } = require("google-translate-open-api");

module.exports = {
  name: "translate",
  alias: ["tr"],
  desc: "Terjemahkan teks ke bahasa lain",
  type: "tools",
  start: async (client, m, { text }) => {
    if (!text) return m.reply("Contoh: .translate en|id Hello world");

    let [from, to, ...sentence] = text.split(" ");
    let query = sentence.join(" ");
    if (!from || !to || !query) return m.reply("Format salah.Contoh: .translate en id Hello world");

    try {
      const result = await translate(query, {
        tld: "com",
        from,
        to,
      });

      const translated = result.data[0];
      m.reply(`📤 *Terjemahan (${from} → ${to}):*
${translated}`);
    } catch (e) {
      m.reply("❌ Gagal menerjemahkan.");
    }
  },
};
