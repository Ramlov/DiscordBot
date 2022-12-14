const config = require('./config.json')
const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection, ActivityType, Guild} = require('discord.js');

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
            name: `benjamin`,
            type: ActivityType.Watching
        }]
    }
})

client.slashCommands = new Collection()
require('./handlers/command')(client, false)
require('./handlers/event')(client)


client.login(config.token);

