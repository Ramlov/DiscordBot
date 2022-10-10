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
        .setName('catfact')
        .setDescription('Svarer med catfact'),
    async slashRun(client, interaction) {
            const dictResult = await request(`https://catfact.ninja/fact`);
            const list = await getJSONResponse(dictResult.data);
            console.log(list)
            const [answer] = list;
            const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields({ fact: 'Fact', value: trim(answer.fact, 1024) });
            await interaction.deferReply();
            interaction.editReply({ embeds: [embed] });
    
	}
    
};
