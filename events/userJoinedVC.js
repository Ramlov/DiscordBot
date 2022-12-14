const { ChannelType, PermissionsBitField } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice') //npm install @discordjs/voice
const fs = require('fs')


module.exports = {
    name: 'voiceStateUpdate',
    async run(oldState, newState) {
        var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        try {
            if(newState.channel === null) {}
            if(newState.channel.id == config.VH.jtc.id) {
                var data = fs.readFileSync("./config.json")
                var parsedData = JSON.parse(data)

                // Check if user already has a voice channel
                for(let i = 0; i< parsedData['VH']['channels'].length; i++) {
                    if (parsedData['VH']['channels'][i]['owner_id'] == newState.id){ // user already has an active voice channel

                        //newState.disconnect(['An active VC of yours, has been located.']) // disconnect the user
                        newState.setChannel(parsedData['VH']['channels'][i]['channel_id']) // move to users channel
                        //newState.member.send('Din spasser. Du har allerede en fucking kanal. Jeg har derfor flyttet dig hen til din nuværende kanal.')
                        return
                    }
                }

                // Create voice channel
                const voiceChannel = newState.guild.channels.create({
                    name: newState.member.user.username + '\'s VC',
                    type: ChannelType.GuildVoice,
                    parent: config.VH.parent,
                    permissionOverwrites: [
                        {
                            id: newState.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: newState.member.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        }
                    ]
                })
                await Promise.resolve(voiceChannel).then(async(value) => {

                    // Create channel object
                    var obj = {
                        "channel_id": value.id,
                        "owner_id": newState.member.user.id,
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
        } catch(err) {
            console.log(err)
        }
    }
}