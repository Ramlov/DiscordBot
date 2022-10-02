const { ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice') //npm install @discordjs/voice
const config = require('../config.json');


module.exports = {
    name: 'voiceStateUpdate',
    async run(oldState, newState) {
        try {
            if(newState.channel.id == config.VH.jtc.id) {
                const voiceChannel = newState.guild.channels.create({
                    name: newState.member.user.username + '\'s VC',
                    type: ChannelType.GuildVoice,
                    parent: config.VH.parent
                })
                await Promise.resolve(voiceChannel).then((value) => {
                    // append channel id, id of owner who created the channel and more to the config channels: []
                });

                const connection = joinVoiceChannel({
                    channelID: 0, // get the id from the config.channel.<id>
                    guildId: newState.guild.id,
                    adapterCreator: newState.guild.adapterCreator
                })
            }
        } catch(err) {console.log(err)}
    }
}
