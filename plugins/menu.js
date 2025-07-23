 /*
 * this code was created with assistance from chatgpt
 * feature logic developed by kyuurzy
 */
const ErrorFile = require("../XFile.js");
const config = require("../config"); 
const os = require("os");
const { formatSize } = require("../utils/fungsion");
const { performance } = require("perf_hooks");

const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const formattedUsedMem = formatSize(usedMem);
const formattedTotalMem = formatSize(totalMem);

function formatRuntime(ms) {
let seconds = Math.floor(ms / 1000) % 60;
let minutes = Math.floor(ms / (1000 * 60)) % 60;
let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
let days = Math.floor(ms / (1000 * 60 * 60 * 24));
return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

let botStartTime = performance.now();

module.exports = {
command: ["menu"],
run: async ({ client, message, reply }) ={
  let user = await client.getEntity(message.senderId);
  let username = user.username ? `@${user.username}` : "";
  let fullName = user.firstName + (user.lastName ? ` ${user.lastName}` : "");
  let mention = username || fullName;
  let userId = user.id;
  let runtime = formatRuntime(performance.now() - botStartTime);

let caption = `__**❏ ─「 Information 」**__
__**─ 丝 Hii ${mention}**__
__**─ 丝 Your Username : ${fullName}**__
__**─ 丝 Your ID Telegram : ${userId}**__

__**❏ ─「 Botz - Information 」**__
__**─ 丝 Botname : ${config.botName}**__
__**─ 丝 Creator : @XPanzZyyOfficial**__
__**─ 丝 Botz Runtime : ${runtime}**__

__**❏ ─「 Commands - Botz 」**__
__**─ 丝 Cek**__
__**─ 丝 Test**__
__**─ 丝 Broadcast**__
__**─ 丝 Play**__
__**─ 丝 Text1 ( Tebel)**__
__**─ 丝 Text2 ( Miring)**__
__**─ 丝 Text3 ( Hide Text )**__
__**─ 丝 Text4 ( Rapih )**__
`;
  await client.sendFile(message.chatId, {
  file: "https://files.catbox.moe/n1yqe1.jpg",
  caption: caption,
  replyTo: message.id,
  });
  },
  };