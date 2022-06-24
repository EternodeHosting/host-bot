const config = require("../config.json")
const wait = require('node:timers/promises').setTimeout;
const chalk = require('chalk');
const { Discord, MessageEmbed, Permissions } = require('discord.js');
const db = require("quick.db");
const Discord = require('discord.js')


module.exports = async (client, message) => {
    let blacklisted = db.get(`blacklist_${message.author.id}`);
    if(message.author?.bot) return
//    if(message.channel.type == "DM") return client.channels.cache.get(config.logs.dms).send(`${message.author.tag} (${message.author.id}): ${message.content}`)
    
    if(message.author.id === '517107022399799331' && message.content.toLowerCase().startsWith('eval')) return client.commands.get('eval').run(client, message, message.content.split(/ +/))
    
    if(blacklisted == true) return;

    function deleteMessage() {
        //console.log("deleted " + message.content + " from " + message.author.tag)
        message.delete(1);
        message.channel.send(`${message.author} You cannot advertise in here.`)
    }
    const invites = ["discord.gg/", "discord.com/invite/"];
    if(message.content.includes("discord.gg/")) {
        // vérification permissions pour bypass
        if(message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNEL)) return;

        // by TechKaven#7265  
        // channel pub eternode
        if(message.channel.id === '980857551325384744') return;
        deleteMessage();
    }
    if(message.content.includes("discord.com/invite/")) {
        // by TechKaven#7265
        // vérification permissions pour bypass
        if(message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNEL)) return;
           
        // channel pub eternode
        if(message.channel.id === '980857551325384744') return;
        deleteMessage();
    }

    const array = require(`../scam.json`)
    if (array.some(word => message.content.toLowerCase().includes(word))) {
        try {
        message.delete({ reason: 'AntiScam' });
        message.guild.bans.create(message.author, { reason: 'AntiScam'})
        const logEmbedDesc = 'Scam link blocked!'
        .replace(/{MENTION}/g, message.author.tag)
        .replace(/{ID}/g, message.author.id)
        .replace(/{MESSAGE}/g, message.content)
        .replace ("://", ": //");
        const logChannel = client.channels.cache.get(config.channelID.logs)
        const logEmbed = new MessageEmbed()
        .setColor(`RED`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(logEmbedDesc)
        .setTimestamp()
        .addFields([{ name: 'Action', value: 'Ban' }]);
        await logChannel.send({ embeds: [logEmbed] });
       }
      catch (error){
        console.error(error);
        await logChannel.send(error);
      }
    }
    
    if(message.channel.id === config.channelID.suggestions && !message.content.startsWith('>')){
        message.react('👍')
        await wait(500)
        message.react('👎')
        return 
    }

    // suggested by astrexx
    if (message.author.bot === false) {
        if(message.mentions.members.size > 4) 
        {
            message.delete();
            message.guild.members.kick(message.author.id);
            message.channel.send(`${message.author.tag} has been kicked for spamming mentions.`);
        }
    }

    client.commands = new Discord.Collection();


    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                console.log(file + " | Check ✅")
            } else {

                console.log(file + " | Failed ❌")

            }

            
        }
    });


    if(config.settings.maintenance === true && !message.member.roles.cache.has(config.roleID.administrator)) return
    if(!message.content.toLowerCase().startsWith(config.bot.prefix) || message.author.bot) return;
    if(message.content.length <= config.bot.prefix.length) return 

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(default_prefix)) return;

    if (!message.member)
    message.member = message.guild.fetchMember(message);

    const args = message.content
        .slice(default_prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (command) command.run(client, message, args);
}


// NOT TRYED AT YOUR RISK

