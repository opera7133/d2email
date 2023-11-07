const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const nodemailer = require("nodemailer");
require("dotenv").config();
// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});
const mail = process.env.MAIL_ACCOUNT;
const pass = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: mail,
    pass: pass,
  },
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
  console.log(msg);
  await transporter.sendMail({
    from: "m21092@g.metro-cit.ac.jp", // 送信元メールアドレス
    to: process.env.MAIL_TO_ACCOUNT, // 送信先メールアドレス
    subject: "Discord通知：" + msg.author.displayName,
    text: msg.author.displayName + ": " + msg.content,
  });
});

// Log in to Discord with your client's token
client.login(token);
