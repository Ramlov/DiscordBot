const { EmbedBuilder,  SlashCommandBuilder, ChannelType, PermissionsBitField, SlashCommandSubcommandBuilder} = require('discord.js');
const config = require('../../config.json');
const fs = require('fs')

var rename = require('./subcommands/rename.js')
var perms = require('./subcommands/perms.js')
var removeperms = require('./subcommands/removeperms.js')
var del = require('./subcommands/delete.js')
var claim = require('./subcommands/claim.js')
var limit = require('./subcommands/limit.js')
var parent = require('./subcommands/parent.js')

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
const delSubCommand = subCommand => subCommand
    .setName('delete')
    .setDescription('Deletes the channel')
const claimSubCommand = subCommand => subCommand
    .setName('claim')
    .setDescription('Claims the current channel, you\'re connected to')
const limitSubCommand = subCommand => subCommand
    .setName('limit')
    .setDescription('Limits the channel user size')
const parentSubCommand = subCommand => subCommand
    .setName('parent')
    .setDescription('Change the parent channel')
    .addStringOption(option => option.setName('parent').setDescription('ID of the parent').setRequired(true));



// VH = Voice Helper (shittier version of Voice Master - who doesn't like that!)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Voice help command')
        .addSubcommand(renameSubCommand)
        .addSubcommand(permSubCommand)
        .addSubcommand(removepermSubCommand)
        .addSubcommand(delSubCommand)
        .addSubcommand(claimSubCommand)
        .addSubcommand(limitSubCommand)
        .addSubcommand(parentSubCommand),
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
            case 'delete':
                await del(subcommand, config)
                break
            case 'claim':
                await claim(subcommand, config)
                break
            case 'limit':
                await limit(subcommand, config)
                break
            case 'parent':
                await parent(subcommand, config)
                break
        }
    }
};
