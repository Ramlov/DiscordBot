const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const fs = require('fs')

var perms = async function(interaction, config){
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
                content: `\`\`${target.username}\`\` har allerede permissions til \`\`${interaction.member.voice.channel.name}\`\``,
                ephemeral: true
              })
            return
        }

        // Check if the targer user already has special permissions
        if(config.VH.channels[index].private_perms.includes(target.id)){
            await interaction.reply({
                content: ``,
                ephemeral: true
              })
            return
        }

        // Add the target to the private_perms list
        var configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        configs.VH.channels[index].private_perms.push(target.id)
        const json = JSON.stringify(configs)
        fs.writeFile('config.json', json, (err) => {
            if (err) {
                console.log(err);
            }
        });

        await interaction.reply({
            content: `\`\`${target.username}\`\` har nu permissions til \`\`${interaction.member.voice.channel.name}\`\``,
            ephemeral: true
          })
        
    } else {
        await interaction.reply({
            content: `Du har ingen permissions til denne kommando`,
            ephemeral: true
          })
    }
}
module.exports = perms