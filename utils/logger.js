

const chalk = require("chalk")
const moment = require("moment");

module.exports = (type, msg) => {
    const loggedType = type.toLocaleUpperCase()
    if (!type) type = 'Null'
    switch (type) {
        case 'Load': // [LOAD]
            return console.log(`\n[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.cyan`${msg}`);

        case 'Command Ran': // [COMMAND KØRT]
        case 'Command': // [COMMAND]
        case 'Event': // [EVENT]
            return console.log(`\t[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.blue`${msg}`);

        case 'Debug': // [DEBUG]
            return console.log(`\n[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.white`${msg}`)

        case 'Error': // [ERROR]
            return console.log(`\n[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.red`${msg}`)

        case 'MongoDB': // [MONGODB]
            return console.log(`\n[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.blue`${msg}`)

        default: // [SOMETHING ELSE]
            return console.log(`\n[` + chalk.blue`${moment().format('D/M/Y HH:mm:ss')}` + `]` + `[` + chalk.white(`${loggedType}`) + `]` + ' ' + chalk.blue`${msg}`);

    }

}
