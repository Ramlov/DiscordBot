const { EmbedBuilder,  SlashCommandBuilder, CommandInteractionOptionResolver} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grupper')
        .setDescription('Liste af alle grupper'),

    async slashRun(client, interaction, guild) {
        group_members = [];
        for(let i = 0; i < config.roles.length; i++){
            group_members[i] = await interaction.guild.roles.cache.get(config.roles[i]).members.map(m=>m.user.username)
            if (group_members[i] == ''){
                group_members[i] = ['Ingen fundet i denne gruppe']
            }
        }
        const groups = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('COMTEK1 - Grupper')
            .addFields(
                { name: '**Gruppe 1** *('+group_members[0].length+')*', value: '``'+group_members[0].join('\n')+'``', inline: true },
                { name: '**Gruppe 2** *('+group_members[1].length+')*', value: '``'+group_members[1].join('\n')+'``', inline: true },
                { name: '**Gruppe 3** *('+group_members[2].length+')*', value: '``'+group_members[2].join('\n')+'``', inline: true },
                { name: '**Gruppe 4** *('+group_members[3].length+')*', value: '``'+group_members[3].join('\n')+'``', inline: true },
                { name: '**Gruppe 5** *('+group_members[4].length+')*', value: '``'+group_members[4].join('\n')+'``', inline: true }
            )
            .setTimestamp()
        
        interaction.reply({ embeds: [groups] });
    },
};
