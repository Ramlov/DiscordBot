const {EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const roles = ["1009429123212517486", "1009429158104924172", "1015914476505141258", "1015914502748905472", "1015914525859528764"]
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
                        value: roles[0],
                    },
                    {
                        label: 'Gruppe 2',
                        description: 'Gruppe for gruppe 132',
                        value: roles[1],
                    },
                    {
                        label: 'Gruppe 3',
                        description: 'Gruppe for gruppe 133',
                        value: roles[2],
                    },
                    {
                        label: 'Gruppe 4',
                        description: 'Gruppe for gruppe 134',
                        value: roles[3],
                    },
                    {
                        label: 'Gruppe 5',
                        description: 'Gruppe for gruppe 135',
                        value: roles[4],
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
                if (interaction.member.roles.cache.has(interaction.values[0])) {
                        await interaction.member.roles.remove(interaction.values[0])
                } else await interaction.member.roles.add(interaction.values[0])
            }
          
            interaction.reply({
              content: 'Roles update!',
              ephemeral: true
            })
          })
    }
    }