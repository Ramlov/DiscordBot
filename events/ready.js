const logger = require('../utils/logger')
const chalk = require("chalk");

module.exports = {
    name: 'ready',
    run(client) {
        logger('Ready', 'Logged ind som' + ' ' + chalk.bold.white(client.user.username) + ' ' + 'rock and roll!')
        require('../handlers/command')(client, true)
            .then(() => {
                logger('DEPLOY', 'Slash commands klar.')

            })

    }
}

