const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs')

var rename = async function(interaction, config){ 
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
    
    // Check if user owns the channel, or has admin permission or has special permissions
    if(config.VH.channels[index].owner_id == user || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || config.VH.channels[index].private_perms.includes(user)){
        await interaction.reply({
            content: `\`\`${interaction.member.voice.channel.name}\`\` -> \`\`${interaction.options.getString('name')}\`\``,
            ephemeral: true
            })
        // Rename the VC
        interaction.member.voice.channel.setName(interaction.options.getString('name'))
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
            })
    }
}
module.exports = rename;