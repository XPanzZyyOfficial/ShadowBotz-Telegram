const config = require("../config");

module.exports = {
    command: ["text2"],
    run: async ({ client, message, text, reply }) => {
    let text = message.message.split(" ").slice(1).join(" ").trim();
    if (!text) return reply("Gunakan format: text2 <query>");
    reply(`__${text}__`) 
    },
    };