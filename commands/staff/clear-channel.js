const Discord = require("discord.js")

module.exports = async function(client, message, args){
      if (!message.guild.me.permissions.has('EMBED_LINKS')) {
        return message.channel.send('Je nai pas la permission  **EMBED_LINKS**')
    }

  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
        return message.channel.send('Je nai pas cette permission : MANAGE_CHANNELS**')
    }
  if(!message.member.permissions.has("MANAGE_CHANNELS")) {
    return message.channel.send("Tu n'as pas la permission **MANAGE_CHANNELS**")
  }

    let positionn = message.channel.position
  
    message.channel.clone().then((canal) => {
  
    message.channel.delete()
  
    canal.setPosition(positionn)

    const embed = new Discord.MessageEmbed()
    .setTitle(`:WarnFlash: | Channel nuked `)
    .setFooter(`Chat nuked by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(0xFF0000)
    canal.send({
      embeds: [embed]
    })
  
    });
}
} 
