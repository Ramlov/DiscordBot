const { EmbedBuilder, MessageActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Sends a random meme in an embed'),
	async slashRun(client, interaction) {
        var memes = ['https://aws1.discourse-cdn.com/codecademy/original/5X/3/c/8/5/3c85feecb4eb52a4d69ef0891cfbc495a1da7174.png',
            'https://i.redd.it/520hz0cgh8471.jpg', 
            'https://remote-tools-images.s3.amazonaws.com/programmer-memes/10.jpg',
            'https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be7eedf8e1f31aabcec_BwENfmI0CU5dZGYlSyo142mpfG08-rYgTS-Qm47uMUXN6JXtmdZvtzVzTooUQdXTWmTD8uzF9N6XQJA2vUIMi53tunFyVtvOBJTNfOjHit2P_JkTmFzFsK7ep6Vb9781XZnRAryH.png',
            'https://miro.medium.com/max/1400/0*z1mm6izqSeDiKukb',
            'https://i.chzbgr.com/full/9591928832/h8AC54339/laptop-writing-whole-project-as-student-gim-writing-10-lines-code-as-salaried-enough-today',
            'https://i.pinimg.com/originals/d0/8d/7d/d08d7d3564444466692a186c232e9e5d.png',
            'https://i1.wp.com/cleus.co/wp-content/uploads/2019/03/memecoders.jpg?resize=1058%2C959&ssl=1',
            'https://www.semicolonworld.com/uploads/memes/HPh5cSj4MQ.jpg',
            'https://miro.medium.com/max/1400/0*r6iQzljiuJavVxRM',
            'https://codingbootcamps.io/wp-content/uploads/m2.png',
	    'https://i.ytimg.com/vi/g_Y9ZV-y3bM/maxresdefault.jpg',
            ]
        
        var index = Math.floor(Math.random() * memes.length);
        const memeEmbed = new EmbedBuilder()
        .setTitle('Her er dit random meme❤️')
        .setImage(memes[index])
        .setColor("Random")
        await interaction.reply({content: null, embeds: [memeEmbed]})
	},
};

