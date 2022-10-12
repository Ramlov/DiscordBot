const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs');
const interactionCreate = require('../../../events/interactionCreate');

var add = async function(interaction, config){
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

        // Check if target is real
        const target = interaction.options.getUser('target')

        if(!target || target.bot == true){
            await interaction.reply({
                content: `Hvem fuck er det?`,
                ephemeral: true
              })
            return
        }

        // Check if target is the owner_id
        if(target.id == config.VH.channels[index].owner_id){
            await interaction.reply({
                content: `Du kan ikke adde dig selv.`,
                ephemeral: true
              })
            return
        }

        // Check if the targer user already has special permissions
        if(config.VH.channels[index].private_perms.includes(target.id)){
            await interaction.reply({
                content: `Han har allerede permissions til din voice channel`,
                ephemeral: true
              })
            return
        }

        // Add user to voice channel permissions "View Channel"
        interaction.member.voice.channel.permissionOverwrites.edit(target.id, { ViewChannel: true})

        await interaction.reply({
            content: `\`\`${target.username}\`\` kan nu se <#${interaction.member.voice.channel.id}>`,
            ephemeral: true
          })
        
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
          })
    }
}
module.exports = add