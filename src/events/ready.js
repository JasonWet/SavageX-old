const { client } = require('../index');
const conf = require('../conf.json');

(async () => {
    //Login to the bot with the token
    return client.login(conf.token);
})();

client.on('ready', async () => {

    client.user.setPresence({
        status: `${conf.botStatus}`,
        activity: {
            name: `${conf.botActivityName}`,
            type: `${conf.botActivityType}`
        }
    })
    console.log(`${client.user.username} is now ready!` && `Join discord.gg/savagelabs for support`)
});