const Discord = require('discord.js');
const chalk = require('chalk')
const config = require('../config.json')
const fs = require('fs')
const { default: axios } = require('axios')
const exec = require('child_process').exec;
let idkwhatisthis = false
module.exports = async (client) => {
    console.log(chalk.hex('#6b7dfb')(`Eternode Hosting`))
    console.log(`Logged in as: ${chalk.underline(client.user.tag)}`)
    console.log(`Save Console: ${config.settings.consoleSave ? chalk.green('true') : chalk.red('false')}`)
    console.log(`Node Status: ${config.settings.nodeStatus ? chalk.green('true') : chalk.red('false')}`)
    console.log(`Maintenance mode: ${config.settings.maintenance ? chalk.green('true ') : chalk.red('false')}`)
    console.log(`Auto Leave Guilds: ${config.settings.autoLeave ? chalk.green('true') : chalk.red('false')}`)
    console.log(`Minecraft Port Checker: ${config.settings.McScript ? chalk.green('true') : chalk.red('false')}`)
    console.log()

    const autorun = fs.readdirSync(`./autoRun`).filter(file => file.endsWith('.js'));
    autorun.forEach(file => {
        require(`../autoRun/${file}`)(client)
    });


    if(config.settings.updateFromGithub){
        setInterval(async () => {
            await exec(`git pull origin master`, async (error, stdout) => {
                let response = (error || stdout);
                if (!error) {
                    if (!response.includes("Already up to date.")){
                        console.log(`${chalk.red('[ GitHub ]')} Update found on github. downloading now!`);
                        await client.channels.cache.get(config.channelID.github).send({content: "**RESTARTING . . .**", embeds:[
                            new Discord.MessageEmbed()
                            .setTitle(`**[PULL FROM GITHUB]** New update on GitHub. Pulling.`)
                            .setColor(`BLUE`)
                            .setDescription(`Logs:\n\`\`\`\n${response}\`\`\``)
                        ]})
                        console.log(`${chalk.red('[ GitHub ]')} the new version had been installed. Restarting now . . .`)
                        process.exit()
                    }else {
                        if(!idkwhatisthis) {console.log(`${chalk.green('[ GitHub ]')} Bot is up to date\n`); idkwhatisthis = true}
                    }
                }else{
                    console.log(`${chalk.red('[ GitHub ]')} Error: ${error}\n`)
                }
            })
        }, 30000)
    }

    const clientactivity = [
        `EterNode Free`,
        `Hébergeur gratuit`,
        `24/7`,
        `sans lag`,
        `EterNode`
    ]
    setInterval(() => {
        client.user.setActivity(clientactivity[Math.floor(Math.random() * clientactivity.length)], { type: "WATCHING" })
    }, 5000)
    setInterval(() => {
        let guild = client.guilds.cache.get(config.settings.guildID);
        let membercount3 = guild.members.cache.size.toLocaleString();
        client.channels.cache.get(config.voiceID.members).edit({ 
            name: `Total Members: ${membercount3}`
        })

        axios({
            url: config.pterodactyl.host + "/api/application/servers",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + config.pterodactyl.adminApiKey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        }).then(response => {
            client.channels.cache.get(config.voiceID.servers).edit({ 
                name: `Total Servers: ${response.data.meta.pagination.total.toLocaleString()} Servers`
            })
        })

        axios({
            url: config.pterodactyl.host + "/api/application/users",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + config.pterodactyl.adminApiKey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        }).then(response => {
            client.channels.cache.get(config.voiceID.clients).edit({ 
                name: `Total Users: ${response.data.meta.pagination.total.toLocaleString()} Users`
            })
        })    
        console.log('voice channels updated')    
    }, 60000);

    if(config.settings.autoLeave) client.guilds.cache.forEach(g => {
        if(g.id === config.settings.guildID) return
        g.leave().catch(console.error)
    })

    client.manager.init(client.user.id);
}
