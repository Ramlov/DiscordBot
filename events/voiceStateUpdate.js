const { ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice') //npm install @discordjs/voice
const config = require('../config.json');
const fs = require('fs')


module.exports = {
    name: 'voiceStateUpdate',
    async run(oldState, newState) {
        try {
            if (newState.channel.id == null) return;
            if(newState.channel.id == config.VH.jtc.id) {
                var data = fs.readFileSync("./config.json")
                var parsedData = JSON.parse(data)

                // Check if user already has a voice channel
                for(let i = 0; i< parsedData['VH']['channels'].length; i++) {
                    if (parsedData['VH']['channels'][i]['owner_id'] == newState.guild.ownerId){ // user already has an active voice channel
                        //newState.disconnect(['An active VC of yours, has been located.']) // disconnect the user
                        newState.setChannel(parsedData['VH']['channels'][i]['channel_id']) // move to users channel
                        newState.member.send('Din spasser. Du har allerede en fucking kanal. Jeg har derfor flyttet dig hen til din nuværende kanal.')
                        return
                    }
                }
                // Create voice channel
                const voiceChannel = newState.guild.channels.create({
                    name: newState.member.user.username + '\'s VC',
                    type: ChannelType.GuildVoice,
                    parent: config.VH.parent
                })
                await Promise.resolve(voiceChannel).then(async(value) => {

                    // Create channel object
                    var obj = {
                        "channel_id": value.id,
                        "owner_id": value.guild.ownerId,
                        "parent_id": value.parentId,
                        "guild_id": value.guildId,
                        "private_perms": []
                    }
                    parsedData['VH']['channels'].push(obj)

                    await fs.writeFile("./config.json", JSON.stringify(parsedData), (err) =>{
                        if(err) throw err;
                    })


                    // Connect user to the VC
                    newState.setChannel(value.id)

                });
            }
        } catch(err) {}
    }
}