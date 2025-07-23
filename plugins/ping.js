
module.exports = {
  name: "ping",
  alias: ["botstatus", "speed"],
  desc: "Cek status bot dan kecepatan respon",
  type: "info",
  start: async (client, m) => {
    const start = new Date().getTime();
    const res = await client.sendMessage(m.from, { text: "Testing Ping..." }, { quoted: m });
    const end = new Date().getTime();
    const ping = end - start;

    client.sendMessage(m.from, {
      text: `🏓 *PONG!*
📡 *Kecepatan:* ${ping}ms
✅ Bot aktif dan responsif.`,
    }, { quoted: res });
  },
};
