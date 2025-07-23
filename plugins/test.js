const config = require("../config");

module.exports = {
    command: ["test"],
    run: async ({ client, text, reply }) => {
        reply(`__**Bot Sudah Online Kak**__`);
    },
};