const {EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

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
                .addOptions(
                    {
                        label: 'Gruppe 1',
                        description: 'Gruppe for gruppe 131',
                        value: '1009429123212517486',
                    },
                    {
                        label: 'Gruppe 2',
                        description: 'Gruppe for gruppe 132',
                        value: '1009429158104924172',
                    },
                    {
                        label: 'Gruppe 3',
                        description: 'Gruppe for gruppe 133',
                        value: '1015914476505141258',
                    },
                    {
                        label: 'Gruppe 4',
                        description: 'Gruppe for gruppe 134',
                        value: '1015914502748905472',
                    },
                    {
                        label: 'Gruppe 5',
                        description: 'Gruppe for gruppe 135',
                        value: '1015914525859528764',
                    },
                ),
        );
        const roleEmbed = new EmbedBuilder()
        .setTitle('Vælg din rolle her')
        .setColor("Random")
        await interaction.reply({content: null, embeds: [roleEmbed] , components: [row]})
        client.on('interactionCreate', async (interaction, guild) => {
            if(!interaction.isSelectMenu()) {
              return;      
            }
          
          const { customId, values} = interaction
          
            if(customId === 'select'){
                await interaction.member.roles.add(interaction.values[0])
            }
          
            interaction.reply({
              content: 'Roles update!',
              ephemeral: true
            })
          })
    }
    }

