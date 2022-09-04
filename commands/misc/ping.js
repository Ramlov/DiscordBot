const { EmbedBuilder,  SlashCommandBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Tjek latency'),
    async slashRun(client, interaction) {
        await interaction.deferReply()
        const initialInteraction = await interaction.editReply('Beregner latency...')
        const latency = initialInteraction.createdTimestamp - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .addFields([
                {name: 'Latency', value: `\`${latency}\`ms`, inline: true},
                {name: 'API latency', value: `\`${apiLatency}\`ms`, inline: true}
            ])
            .setColor("Random")
        await interaction.editReply({content: null, embeds: [embed]})

    }
};
