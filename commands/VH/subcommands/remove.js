const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs');
const interactionCreate = require('../../../events/interactionCreate');

var remove = async function(interaction, config){
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
    if(config.VH.channels[index].owner_id == user || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator || config.VH.channels[index].private_perms.includes(user))){
        // Check if interaction.options role was selected or user was selected
        let target = interaction.options.getUser('user')
        let content = 0
        if(target == null){
            target = interaction.options.getRole('role')
            content = `<@&${target.id}> kan nu ikke se <#${interaction.member.voice.channel.id}>`
        } else content = `<@${target.id}> kan nu ikke se <#${interaction.member.voice.channel.id}>`
        

        if(!target || target.bot == true || target == null){
            await interaction.reply({
                content: `Hvem fuck er det?`,
                ephemeral: true
              })
            return
        }

        // Check if target is the owner_id
        if(target.id == config.VH.channels[index].owner_id){
            await interaction.reply({
                content: `Du kan ikke bruge \`\`/voice remove\`\` på dig selv!`,
                ephemeral: true
              })
            return
        }

        // Check if the targer user already has special permissions
        if(config.VH.channels[index].private_perms.includes(target.id)){
            await interaction.reply({
                content: `Han har allerede ingen permissions til din voice channel`,
                ephemeral: true
              })
            return
        }

        // Add user to voice channel permissions "View Channel"
        interaction.member.voice.channel.permissionOverwrites.edit(target.id, { ViewChannel: false})

        await interaction.reply({
            content: content,
            ephemeral: true
          })
        
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
          })
    }
}
module.exports = remove