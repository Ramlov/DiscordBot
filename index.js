const config = require('./config.json')
const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection, ActivityType} = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ],
    allowedMentions: { parse: ["users"] },
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    presence: {
        activities: [{
            name: `Den bedste ComTek bot`,
            type: ActivityType.Competing
        }]
    }
})

client.slashCommands = new Collection()
require('./handlers/command')(client, false)
require('./handlers/event')(client)


client.login(config.token);

const rr = new ReactionRole(client, [
    { messageId: "1016368454883881100", reaction: "1️⃣", roleId: "1009429123212517486" },
    { messageId: "1016368454883881100", reaction: "2️⃣", roleId: "1009429158104924172" },
    { messageId: "1016368454883881100", reaction: "3️⃣", roleId: "1015914476505141258" },
    { messageId: "1016368454883881100", reaction: "4️⃣", roleId: "1015914502748905472" },
    { messageId: "1016368454883881100", reaction: "5️⃣", roleId: "1015914525859528764" },
  ]);


  