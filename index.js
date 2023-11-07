const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
const pass = process.env.MAIL_PASSWORD;
sgMail.setApiKey(pass);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
  await sgMail.send({
    from: { email: process.env.MAIL_ACCOUNT, name: "D2Email" }, // 送信元メールアドレス
    to: process.env.MAIL_TO_ACCOUNT, // 送信先メールアドレス
    subject: "Discord通知：" + msg.author.displayName,
    text: msg.author.displayName + ": " + msg.content + "\n" + "in #" + msg.channel.name,
  });
});

client.login(token);
