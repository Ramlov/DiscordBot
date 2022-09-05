const {EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Besked for roles'),
    async slashRun(client, interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                ),
        );
        const roleEmbed = new EmbedBuilder()
        .setTitle('Vælg din rolle her')
        .setColor("Random")
        await interaction.reply({content: null, embeds: [roleEmbed] , components: [row]})
    }
};

