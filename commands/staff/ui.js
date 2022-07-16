const Discord = require("discord.js"); 
module.exports = (message, args) => { 
  
         var embed = new Discord.MessageEmbed() 
         .setColor('#0099ff') 
         .setDescription(`Information about ${message.author.username}#${message.author.discriminator}`) 
         .setTitle('User Info') 
         .addField('Username', `<@${message.author.id>}`) 
         .addField('ID', `||${message.author.id}||`) 
         .addField('Created At', `${message.author.createdAt}`) 
         .addField('Joined At', `${message.member.joinedAt}`) 
         .setThumbnail(`${message.author.avatarURL()}`) 
         .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`) 
  
  
         .setTimestamp() 
  
         message.channel.send({embeds: [embed]}); 
  
 }
