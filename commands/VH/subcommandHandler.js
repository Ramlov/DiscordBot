const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const config = require('../../config.json');
const fs = require('fs')

var rename = require('./subcommands/rename.js')
var perms = require('./subcommands/perms.js')
var removeperms = require('./subcommands/removeperms.js')

// ES6 Syntax
const renameSubCommand = subCommand => subCommand
    .setName('rename')
    .setDescription('Renames a voice channel')
    .addStringOption(option => option.setName('name').setDescription('Name of the voice channel').setRequired(true));
const permSubCommand = subCommand => subCommand
    .setName('perm')
    .setDescription('Adds permissions to user')
    .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true));
const removepermSubCommand = subCommand => subCommand
    .setName('removeperm')
    .setDescription('Removes permissions from user')
    .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true));


// VH = Voice Helper (shittier version of Voice Master - who doesn't like that!)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Voice help command')
        .addSubcommand(renameSubCommand)
        .addSubcommand(permSubCommand)
        .addSubcommand(removepermSubCommand),
    async slashRun(interaction, subcommand) {

        // Check if user is connected to a VC
        if(subcommand.member.voice.channel === null){
            await subcommand.reply({
                content: `Du skal være i en VC, før du kan bruge \`\`/voice ${subcommand.options.getSubcommand(false)}\`\``,
                ephemeral: true
            })
            return
        }


        var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        switch(subcommand.options.getSubcommand(false)){
            case 'rename':
                await rename(subcommand, config)
                break;
            case 'perm':
                await perms(subcommand, config)
                break
            case 'removeperm':
                await removeperms(subcommand, config)
                break
        }
    }
};
