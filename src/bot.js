require('dotenv').config();

const{Client} = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});


/*
* BOT RESPONSES
*/

client.on('message', (message) => {

    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/); 
        
        
        if(CMD_NAME === 'kick'){
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have persmission to use that command');
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);

            if (member){
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('I do not have permissions'));
            }
            else{
                message.channel.send('That member was not found');
            }
        }
        else if(CMD_NAME === 'ban'){
            message.channel.send('Banned the user');
        }
    }
    console.log(`[${message.author.tag}]: ${message.content}` );
    
    // Bot replies to hello
    if(message.content === 'hello'){

        var greetings = [
            "wats poppin"
          , "ciao"
          , "welcome"
          , "howdy"
          , "greetings"
          , "salut"
          , "hallo"
          , "hola"
          , "Gday"
          , "Hey"
      ];
      var greeting_id = Math.floor(Math.random() * greetings.length);
      message.channel.send(greetings[greeting_id]);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
