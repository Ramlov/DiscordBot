const { EmbedBuilder, MessageActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('krydsbolle')
		.setDescription('Spil Kryds og Bolle!'),
	async slashRun(client, interaction) {
		const row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('cell0')
					.setLabel('-')
					.setStyle('SECONDARY'),
                
                new ButtonBuilder()
					.setCustomId('cell1')
					.setLabel('-')
					.setStyle('SECONDARY'),

                new ButtonBuilder()
					.setCustomId('cell2')
					.setLabel('-')
					.setStyle('SECONDARY'),
            );
            const row2 = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
					.setCustomId('cell3')
					.setLabel('-')
					.setStyle('SECONDARY'),

                new ButtonBuilder()
					.setCustomId('cell4')
					.setLabel('-')
					.setStyle('SECONDARY'),

                new ButtonBuilder()
					.setCustomId('cell5')
					.setLabel('-')
					.setStyle('SECONDARY'),
            );
            const row3 = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
					.setCustomId('cell6')
					.setLabel('-')
					.setStyle('SECONDARY'),

                new ButtonBuilder()
					.setCustomId('cell7')
					.setLabel('-')
					.setStyle('SECONDARY'),

                new ButtonBuilder()
					.setCustomId('cell8')
					.setLabel('-')
					.setStyle('SECONDARY'),
			);

		await interaction.reply({ embeds: [new MessageEmbed().setTitle('Turn: X')], components: [row1, row2, row3] });
	},
};