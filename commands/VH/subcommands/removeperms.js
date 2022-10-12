const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs')

var removeperms = async function(interaction, config){
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
                content: `Det kan du ik`,
                ephemeral: true
              })
            return
        }

        // Check if the target doesnt have special permissions
        if(!config.VH.channels[index].private_perms.includes(target.id)){
            await interaction.reply({
                content: `\`\`${target.username}\`\` har alligevel ikke permissions til <#${interaction.member.voice.channel.id}>`,
                ephemeral: true
              })
            return
        }

        // Remove the target to the private_perms list
        var configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        var index = configs.VH.channels[index].private_perms.indexOf(target.id)
        console.log(index)
        configs.VH.channels[index].private_perms.splice(index, 1)
        const json = JSON.stringify(configs)
        fs.writeFile('config.json', json, (err) => {
            if (err) {
                console.log(err);
            }
        });

        // Add user to voice channel permissions "View Channel"
        interaction.member.voice.channel.permissionOverwrites.edit(target.id, { ViewChannel: false })

        await interaction.reply({
            content: `\`\`${target.username}\`\` har nu ingen permissions til <#${interaction.member.voice.channel.id}>`,
            ephemeral: true
          })
        
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
          })
    }

}
module.exports = removeperms