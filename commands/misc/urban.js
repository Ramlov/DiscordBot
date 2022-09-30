const { EmbedBuilder, GatewayIntentBits, SlashCommandBuilder} = require('discord.js');
const { request } = require('undici');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}
	return JSON.parse(fullBody);
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Svarer med resultat fra urban dict'),
    async slashRun(client, interaction) {
        const term = interaction.options.data('term');
		const query = new URLSearchParams({ term });

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const { list } = await getJSONResponse(dictResult.body);
        if (!list.length) {
            return interaction.editReply(`Intet resultat for **${term}**.`);
        }
        const [answer] = list;
        const embed = new EmbedBuilder()
        .setColor(0xEFFF00)
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields({ name: 'Definition', value: trim(answer.definition, 1024) }, { name: 'Example', value: trim(answer.example, 1024) }, { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` });
        await interaction.deferReply();
        interaction.editReply({ embeds: [embed] });
    
	}
    
};


