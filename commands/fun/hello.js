const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hej')
        .setDescription('Svarer random'),
    async slashRun(client, interaction) {

        const replies = [
            "Hey",
            "Hej",
            "Hej med dig",
            "Hey hey",
            "Godt at se dig",
            "Hvad så der?!",
            "Hey, hvordan går det?"
        ]
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        await interaction.reply( randomReply + ` ${interaction.user.username}`)

    }
};
