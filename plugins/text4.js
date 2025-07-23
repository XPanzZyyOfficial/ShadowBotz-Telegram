const config = require("../config");

module.exports = {
    command: ["text4"],
    run: async ({ client, message, text, reply }) => {
    let text = message.message.split(" ").slice(1).join(" ").trim();
    if (!text) return reply("Gunakan format: text4 <query>");
    reply(`\`\`\`${text}\`\`\``) 
    },
    };