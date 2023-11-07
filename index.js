const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
const pass = process.env.MAIL_PASSWORD;
sgMail.setApiKey(pass);
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
  await sgMail.send({
    from: { email: "metro-cit@ja1ykl.com", name: "D2Email" }, // 送信元メールアドレス
    to: process.env.MAIL_TO_ACCOUNT, // 送信先メールアドレス
    subject: "Discord通知：" + msg.author.displayName,
    text: msg.author.displayName + ": " + msg.content + "\n" + "in #" + msg.channel.name,
  });
});

// Log in to Discord with your client's token
client.login(token);
