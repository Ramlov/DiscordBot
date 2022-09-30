const { InteractionType} = require('discord.js');
const logger = require('../utils/logger')


module.exports = {
    name: 'interactionCreate',
    async run(interaction, client) {

        if ((interaction.type === InteractionType.ApplicationCommand)) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.slashRun(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Der var en fejl!', ephemeral: true });
            }
        }
    }
}

