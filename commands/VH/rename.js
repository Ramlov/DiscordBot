const { EmbedBuilder,  SlashCommandBuilder, ChannelType} = require('discord.js');
const config = require('../../config.json');
const fs = require('fs')

// VH = Voice Helper (shittier version of Voice Master - who doesn't like that!)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Voice help command')
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription('Renames a voice channel')
                .addStringOption(option => 
                    option
                        .setName('name')
                        .setDescription('Name of the voice channel')
                        .setRequired(true)
                        )),
    async slashRun(client, interaction, guild) {
        // Check if user is connected to a VC
        if(interaction.member.voice.channel === null){
            await interaction.reply({
                content: 'Du skal være i en VC, før du kan bruge ``/voice rename``',
                ephemeral: true
              })
            return
        }
        
        user = interaction.user.id
        channel_id = interaction.member.voice.channelId
        console.log(user, channel_id)

        // Get the index position of the channels[i]
        index = -1
        for(let i = 0; i < config.VH.channels.length; i++){
            console.log(config.VH.channels[i].owner_id, channel_id)
            console.log(config.VH.channels[i].owner_id == channel_id)
            // Get the channel where the user is connected to
            if (config.VH.channels[i].channel_id == channel_id) {
                console.log(config.VH.channels[i].channel_id, channel_id)
                index = i
            }
        }
        if(index == -1){
            return
        }

        // Check if user owns the channel
        if(config.VH.channels[index].owner_id == user){

            await interaction.reply({
                content: `\`\`${interaction.member.voice.channel.name}\`\` -> \`\`${interaction.options.getString('name')}\`\``,
                ephemeral: true
              })
            // Rename the VC
            interaction.member.voice.channel.setName(interaction.options.getString('name'))
        } else {
            await interaction.reply({
                content: `Du har ingen permission til at edit denne kanal`,
                ephemeral: true
              })
        }
    }
};
