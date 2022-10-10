const {EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, GuildMemberManager, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Besked for roles'),
    async slashRun(client, interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Ingen gruppe valgt')
                .setMinValues(0)
                .setMaxValues(1)
                .addOptions(
                    {
                        label: 'Gruppe 1',
                        description: 'Gruppe for gruppe 131',
                        value: config.roles[0],
                    },
                    {
                        label: 'Gruppe 2',
                        description: 'Gruppe for gruppe 132',
                        value: config.roles[1],
                    },
                    {
                        label: 'Gruppe 3',
                        description: 'Gruppe for gruppe 133',
                        value: config.roles[2],
                    },
                    {
                        label: 'Gruppe 4',
                        description: 'Gruppe for gruppe 134',
                        value: config.roles[3],
                    },
                    {
                        label: 'Gruppe 5',
                        description: 'Gruppe for gruppe 135',
                        value: config.roles[4],
                    },
                ),
        );
        const roleEmbed = new EmbedBuilder()
        .setTitle('Vælg din rolle her')
        .setColor("Random")
        .setImage('https://i.imgur.com/9hJIps5.png')
        await interaction.reply({content: null, embeds: [roleEmbed] , components: [row]})
        client.on('interactionCreate', async (interaction, guild) => {
            if(!interaction.isSelectMenu()) {
              return;      
            }                   
            const { customId, values} = interaction
            if(customId === 'select'){
                if (values.length == 0){
                    for(let i = 0; i < config.roles.length; i++){
                        if (interaction.member.roles.cache.has(config.roles[i])){
                            interaction.reply({
                                content: 'Du har fjernet <@&'+config.roles[i]+'>',
                                ephemeral: true
                              })
                            await interaction.member.roles.remove(config.roles[i])
                        }
                    }
                    return;
                }
                content = ' '
                for(let i = 0; i < roles.length; i++){
                    await interaction.member.roles.remove(roles[i])
                    return;
                }

                for(let i = 0; i < config.roles.length; i++){
                    if (interaction.member.roles.cache.has(config.roles[i])){
                        await interaction.member.roles.remove(config.roles[i])
                    }
                }

                await interaction.member.roles.add(values[0])
                content = 'Du har nu fået <@&'+values[0]+'>'
                await interaction.reply({
                    content: content,
                    ephemeral: true
                  })
            }
        })
    }
    }

