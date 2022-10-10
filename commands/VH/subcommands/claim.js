const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs')

var claim = async function(interaction, config){
    user = interaction.user.id
    channel_id = interaction.member.voice.channelId
    
    // Get the index position of the channels[i]
    index = -1
    for(let i = 0; i < config.VH.channels.length; i++){
        // Get the channel where the user is connected to
        if (config.VH.channels[i].channel_id == channel_id) {
            index = i
        }
    }
    if(index == -1){
        await interaction.reply({
            content: 'Fejl',
            ephemeral: true
        })
        return
    }

    // Check if owner is still connected to the vc or check if user owns the channel
    let vid = interaction.guild.members.cache.get(config.VH.channels[index].owner_id || config.VH.channels[index].owner_id == user)
    if (vid.voice.channelId == config.VH.channels[index].channel_id){
        await interaction.reply({
            content: `Du kan ikke claime denne kanal!`,
            ephemeral: true
            })
        return
    }

    await interaction.reply({
        content: `<@${config.VH.channels[index].owner_id}>\`\` -> \`\`<@${user}>\`\``,
        ephemeral: true
        })
        // set new owner id
        var configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        configs.VH.channels[index].owner_id = user
        const json = JSON.stringify(configs)
        fs.writeFile('config.json', json, (err) => {
            if (err) {
                console.log(err);
            }
            });
}
module.exports = claim