const { EmbedBuilder,  SlashCommandBuilder, ChannelType} = require('discord.js');
const config = require('../../config.json');
const fs = require('fs')

// VH = Voice Helper (shittier version of Voice Master - who doesn't like that!)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('First argument of setting up the VH')
        .addSubcommand(subcommand =>
            subcommand
                .setName('default')
                .setDescription('Type of VH module to create')
                .addStringOption(option => 
                    option
                        .setName('editable')
                        .setDescription('Should users be able to edit the channel?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'True', value: 'true'},
                            { name: 'False', value: 'false'}
                        ))),
    async slashRun(client, interaction, guild) {
        if (config.VH.jtc.created == true) {
            await interaction.reply({
                content: 'Jeg kan se, at JTC er allerede blevet lavet.',
                ephemeral: true
              })
            return;
        }

        // Maybe we should limit the command to only specific users

        const jtc = interaction.guild.channels.create({
            name: 'Join To Create',
            type: ChannelType.GuildVoice,
            parent: config.VH.parent
        })

        // Resolve the returned promise call
        await Promise.resolve(jtc).then((value) => {
            // Sets JTC (join to create) to true, so we know that it is created already. Also to limit all other commands
            var configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));
            configs['VH']['jtc']['created'] = true;
            configs['VH']['jtc']['id'] = value.id;
            configs['VH']['jtc']['editable'] = interaction.options.getString('editable')
            const json = JSON.stringify(configs)
            fs.writeFile('config.json', json, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        await interaction.reply({
            content: 'JTC er nu færdig og klar til brug.',
            ephemeral: true
          })
    }
};