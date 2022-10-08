const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs')

var del = async function(interaction, config){
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

    // Check if user owns the channel, or has admin permission
    if(config.VH.channels[index].owner_id == user || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
        const chi = config.VH.channels[index].channel_id
        // Remove channel object from array
        config.VH.channels.splice(index, 1)
        const json = JSON.stringify(config)
            fs.writeFile('config.json', json, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        
        // Delete the channel now
        interaction.member.voice.channel.delete()

        await interaction.reply({
            content: `Du har fjernet <#${chi}>`,
            ephemeral: true
          })
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
          })
    }
}
module.exports = del