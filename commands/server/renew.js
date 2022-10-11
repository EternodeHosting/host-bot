const config = require('../../config.json')
const Discord = require('discord.js');
const axios = require('axios');
module.exports = async (client, message, args) => {
    if(!userData.get(message.author.id)) return message.reply(":x: | You dont have an account created. type `!user new` to create one")
    if(!args[1]) return message.reply(`:x: What server should I renew? please provide you server id *(!server renew <server id>)*`)
    if (args[1].match(/[0-9a-z]+/i) == null)
        return message.channel.send(":x: | lol only use english characters.");

    args[1] = args[1].split('-')[0];

    let msg = await message.channel.send(':signal_strength: | Let me check if this is your server, please wait . . .')

    axios({
        url: config.pterodactyl.host + "/api/application/users/" + userData.get(message.author.id).consoleID + "?include=servers",
        method: 'GET',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            'Authorization': 'Bearer ' + config.pterodactyl.adminApiKey,
            'Content-Type': 'application/json',
            'Accept': 'Application/vnd.pterodactyl.v1+json',
        }
    }).then(async response => {
        const preoutput = response.data.attributes.relationships.servers.data
        const output = await preoutput.find(srv => srv.attributes ? srv.attributes.identifier == args[1] : false)

        if(!output) return msg.edit(`:x: | I could not find that server`)
        if (output.attributes.user !== userData.get(message.author.id).consoleID) return msg.edit(`:x: | You are not the owner of this server`)

        msg.edit({
            content: `:signal_strength: | Are you sure you want to renew \`${output.attributes.name}\`?`,
            components:[
                new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('AcceptRenew')
                        .setLabel('Yes')
                        .setStyle('SUCCESS'),
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('RejectRenew')
                        .setLabel('No')
                        .setStyle('DANGER'),
                )
            ]
        })

        const filter = i => i.user.id === message.author.id;
        const Collector = msg.createMessageComponentCollector({ filter, time: 300000 });

        Collector.on('collect', async i => {
            i.deferUpdate()
            Collector.stop()
            if(i.customId === "AcceptRenew") {
                msg.edit({
                    content: `:signal_strength: | Renewing Server, Please wait . . .`,
                })

                axios({
                    url: config.pterodactyl.host + "/api/application/servers/" + output.attributes.id + "/unsuspend",
                    method: 'POST',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + config.pterodactyl.adminApiKey,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    }
                }).then(() => {
                    msg.edit(`✅ | Server Renewed!`)
                    if(!serverCount.get(message.author.id)) return msg.edit(':x: | WTF? how did u got a server?')
                    serverCount.subtract(message.author.id + '.used', 1)
                }).catch(err => {
                    msg.edit(`:x: | Error: ${err}`)
                })

            }
            if(i.customId === "RejectRenew") {
                msg.edit({
                    content: `✅ | Server renew canceled`,
                })
            }
        })

        Collector.on('end',() => {
            msg.edit({components:[]})
        })
    })  
}