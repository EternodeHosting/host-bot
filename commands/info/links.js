const Discord = require('discord.js')
module.exports = {
    name: "links",
    aliases: ['link'], 
    async run(client, message, args){
       const embed = new Discord.MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor(`${message.author.username}`, message.member.displayAvatarURL({ dynamic: true }))
        .addField('Panel', '[Link](https://panel.eternode.ga)')
        .addField('Website', '[Link](https://eternode.ga)')
        .addField('Discord', '[Link](https://discord.gg/ACxZMArJ)')
        .addField('Github', '[Link](https://github.eternode.ga)')
        message.reply({ embeds: [embed] })

    }
}