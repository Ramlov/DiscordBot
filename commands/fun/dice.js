const { SlashCommandBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('terning')
        .setDescription('Rul en terning.'),
    async slashRun(client, interaction) {
        const rolledNumber = Math.floor(Math.random() * 6) + 1
        await interaction.reply(`Det blev \`${rolledNumber}\``)

    }
};
