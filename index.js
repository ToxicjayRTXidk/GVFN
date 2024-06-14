const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
});

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const statusMessages = ["Greenville NightFall", "Greenville NightFall"];
let currentIndex = 0;
const channelId = 'YOUR_CHANNEL_ID_HERE'; // Replace with your channel ID

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Playing }],
    status: 'dnd',
  });

  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`);
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();
