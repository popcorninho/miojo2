const Discord = require("discord.js");
const fs = require("fs")
const xp = require('./xp.json')
const role = require('./sim.json')
const botconfig = require('./botconfig.json')
const translate = require('google-translate-api');
const prefixo  = botconfig.prefix;
const trigger = require("triggered-module-api");
const generate = new trigger();
const moment = require("moment");
               require("moment-duration-format");
var Jimp = require('jimp');
var bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
    console.log(bot.guilds.size + " servers")
    console.log(bot.users.size + " users")
    console.log(bot.channels.size + " canais")
    bot.user.setActivity('sou melhor que o @Miojo', { type: 'WATCHING' });
    bot.user.setStatus('dnd');
});

/*bot.on('message', async message => {
var abcde = 41
  function play(abcde) {
    var picks = [];
    var numbersArr = [];
    for ( var i = 1; i < abcde; i++ ) {
      numbersArr.push(i);
    }
    while (picks.length < 7){
       var randomIndex = Math.floor(Math.random() * numbersArr.length);
       picks.push(numbersArr[randomIndex]);
       numbersArr.splice(randomIndex, 1);
    }
    return picks;
  }

  var a = play(abcde).toString()
  var b = a.indexOf(",")
  var c = a.substring(0, b)
  var d = a.slice(b + 1)

  var e = d.indexOf(",")
  var f = d.substring(0, e)
  var g = d.slice(e + 1)

  var h = g.indexOf(",")
  var i = g.substring(0, h)
  var j = g.slice(h + 1)

  var k = j.indexOf(",")
  var l = j.substring(0, k)
  var m = j.slice(k + 1)

  var n = m.indexOf(",")
  var o = m.substring(0, n)
  var p = m.slice(n + 1)

  var q = p.indexOf(",")
  var r = p.substring(0, q)
  var s = p.slice(q + 1)

  console.log("Player 1: "+c+" | "+f+" | "+i)
  console.log("Player 1: "+l+" | "+o+" | "+r)
  console.log("Manilha: "+s)
  console.log(a)

})*/

bot.on('message', async message => {
    if(message.channel.type == "dm") return;
    if(message.author.bot) return;
    if(!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }

    let prefixo = prefixes[message.guild.id].prefixes;

    //let prefixo  = botconfig.prefix;
    var args = message.content.substring(prefixo.length).split(" ");
    const lider = message.author.id === "412582853834965003"
    const liderid = "412582853834965003"

    if (message.content.startsWith(prefixo + "setprefix")){
      if(lider){
        prefixes[message.guild.id] = {
          prefixes: args[1]
        };

        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
          if (err) console.log(err)
        });

        message.channel.send(new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle("PREFIXO ALTERADO")
        .setColor(0x4286f4)
        .setDescription("Prefixo do servidor **" + message.guild.name + "** alterado para: **" + args[1] + "**"))
      }
      if(!lider){
        message.channel.send(new Discord.RichEmbed()
        .setAuthor(message.author.username + " viado", message.author.avatarURL)
        .setTitle("PREFIXO")
        .setColor(0x4286f4)
        .setDescription("<@" + message.author.id + ">, só meu dono pode usar ;-;"))
      }
    }
    if (message.content.startsWith(prefixo)){
      console.log(message.guild.name + " | " +message.channel.name+" | " + message.author.tag + ': ' + message.content)
    }

        let xpAdd = Math.floor(Math.random() * 7) + 8;
        if(!xp[message.author.id+","+message.guild.id]){
          xp[message.author.id+","+message.guild.id] = {
            xp: 0,
            level: 1
          };
        }

        //var cargu = message.guild.roles.find("name", "oi")
        let curxp = xp[message.author.id+","+message.guild.id].xp;
        let curlvl = xp[message.author.id+","+message.guild.id].level;
        let nxtlvl = xp[message.author.id+","+message.guild.id].level * 300;
        let nxtlvlxp = curlvl * 300
        let up = curlvl + 1
        //if (xp[message.author.id].level = 5) return message.member.addRole(cargu);
        xp[message.author.id+","+message.guild.id].xp = curxp + xpAdd;
        if(nxtlvl <= xp[message.author.id+","+message.guild.id].xp){
          xp[message.author.id+","+message.guild.id].level = curlvl + 1;
          xp[message.author.id+","+message.guild.id].xp = 0
          message.channel.send(new Discord.RichEmbed()
          .setTitle("LEVEL UP")
          .setColor(0x4286f4)
          .setDescription("<@" + message.author.id + "> subiu para o level **" + up + "**")).then(m => m.delete(5000)).catch(erro => console.log(erro))
        }
        fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
          if(err) console.log(err)
        });

        if(message.content.startsWith(prefixo + "level")){
          let cuser = message.mentions.users.first() || message.author;
          if(!xp[cuser.id+","+message.guild.id]){
            xp[cuser.id+","+message.guild.id] = {
              xp: 0,
              level: 1
            };
          }

          let mlevel = xp[cuser.id+","+message.guild.id].level;
          let mxp = xp[cuser.id+","+message.guild.id].xp;
          let mlvlxp = mlevel * 300;
          let foi = mlvlxp - 300
          /*let oiu = (mlevel - 1) * 300;
          let final = mxp - oiu;*/
          let aqua = foi + mxp
          let diff = mlvlxp - mxp
          let fin = mlevel + 1

          if(cuser.bot){
            message.channel.send("Esse usuário é um BOT").catch(erro => console.log(erro))
          }
          else {
          message.channel.send(new Discord.RichEmbed()
          .setAuthor("Level de " + cuser.tag, cuser.displayAvatarURL)
          .setColor(0x4286f4)
          .addField("LEVEL", mlevel, true)
          .addField("XP:", mxp + " / " + mlvlxp + " (Total: " + aqua + ")", true)
          .setFooter("Falta " + diff + " de XP para " + cuser.username + " subir para o level " + fin)).catch(erro => console.log(erro))
          }
          }

          if(message.content.startsWith(prefixo + "oi")){
            let t = message.mentions.users.first() || message.author
//try {
               let img    = Jimp.read(t.avatarURL),
               moldura = Jimp.read("./img/triggered.png");
               Promise.all([img, moldura]).then(imgs => {
               let moldura = imgs[1],
                   img    = imgs[0];
               moldura.resize(451, 451);
               img.resize(451, 451)
               img.composite(moldura, 0, 0).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                   if (!err)
                   message.channel.send(new Discord.Attachment(buffer));
               });
           })
         //} catch(e) {console.log(e)}
       }


          if(message.content.startsWith(prefixo + "top")){
            if (message.guild.members.size < 10) return message.channel.send("Esse servidor não tem membros suficientes")
            var a = message.guild.members.map(m=> m.id)
                function pou(){

                  var final = [];

                a.forEach( element => {
                  if(!xp[element+","+message.guild.id]){
                    xp[element+","+message.guild.id] = {
                      xp: 0,
                      level: 1
                    };
                  }
                  final.push({nome:xp[element+","+message.guild.id].level + "&%bet#E^´-~~?/!"+ bot.users.get(element).tag + "  **|**  Level: ",level: xp[element+","+message.guild.id].level});
              })
              return final
            }
            var y = pou()
          var organizado = y.sort(function(a,b){
          return b.level-a.level
          }).slice(0,10)
          var z = organizado.map((n,l) => `${(l+1)} ${n.nome} ${n.level}`)
          //message.channel.send(z[0])
          var ta = z[0].indexOf("&%bet#E^´-~~?/!")// + 15
          var tb = z[1].indexOf("&%bet#E^´-~~?/!")
          var tc = z[2].indexOf("&%bet#E^´-~~?/!")
          var td = z[3].indexOf("&%bet#E^´-~~?/!")
          var te = z[4].indexOf("&%bet#E^´-~~?/!")
          var tf = z[5].indexOf("&%bet#E^´-~~?/!")
          var tg = z[6].indexOf("&%bet#E^´-~~?/!")
          var th = z[7].indexOf("&%bet#E^´-~~?/!")
          var ti = z[8].indexOf("&%bet#E^´-~~?/!")
          var tj = z[9].indexOf("&%bet#E^´-~~?/!")


          message.channel.send(new Discord.RichEmbed()
          .setTitle('Top Rank')
          .setDescription("**1-** " + z[0].slice(ta + 15) +"\n**2-** "+ z[1].slice(tb + 15) +"\n**3-** "+ z[2].slice(tc + 15) +"\n**4-** "+ z[3].slice(td + 15) +"\n**5-** "+ z[4].slice(te + 15) +"\n**7-** "+ z[5].slice(tf + 15) +"\n**7-** "+ z[6].slice(tg + 15) +"\n**8-** "+ z[7].slice(th + 15) +"\n**9-** "+ z[8].slice(ti + 15) +"\n**10-** "+z[9].slice(tj + 15)))

}

if(message.content.startsWith(prefixo + "roles")) {
  var a = message.guild.roles.map(function(a,b){
  return {pos:a.position,role:a}
  })
  a = a.sort(function(a,b){
  return b.pos-a.pos
  }).slice(0, a.length-1)
  var txt = a.map((c,b) =>  "**"+c.pos+"-** " + c.role.toString())
  message.channel.send(new Discord.RichEmbed()
  .setTitle("Roles do Server: " + message.guild.name)
  .setDescription(txt)
  .setColor(message.guild.roles.find('position', a.length).color))
}

if(message.content.startsWith(prefixo + "channelinfo")) {
  var a = message.mentions.channels.first() || message.channel
  function formatDate(date) {
    var monthNames = [
      "Janeiro", "Fevereiro", "Março",
      "Abril", "Maio", "Junho", "Julho",
      "Augosto", "Setembro", "Outubro",
      "Novembro", "Dezembro"
    ];
    var diaNomes = [
      "Domingo", "Segunda-feira", "Terça-feira",
      "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    var minutos = a.createdAt.getMinutes();
    var hora = a.createdAt.getHours();
    var day = a.createdAt.getDate();
    var monthIndex = a.createdAt.getMonth();
    var year = a.createdAt.getFullYear();
    var j = ("0" + minutos).slice(-2)
    var h = ("0" + hora).slice(-2)

    return day + ' de ' + monthNames[monthIndex] + ' de ' + year + ' às ' + h + ':' + j;
  }

  function topico() {
    if (a.topic) return "\n**Topico:** " + a.topic + "\n"
    if (!a.topic) return "\n"
  }

  message.channel.send(new Discord.RichEmbed()
    .setTitle(a.name)
    .setDescription("**Posição:** " + a.position + topico() + "**Criado em:** " +(formatDate(new Date()))))
}

if(message.content.startsWith(prefixo + "canais")) {
  var a = message.guild.channels.map(m => m.name)
  message.channel.send(a)
}

if(message.content.startsWith(prefixo + "iu")) {
  var numero = message.content.slice(prefixo.length + 3)
  if (numero % 60 == 0){
     console.log("s")
     console.log(numero / 60)
  }
  else {
     console.log("n")
  }
}
if(message.content.toLowerCase().startsWith(prefixo + "setavatar")){
  if (lider){
bot.user.setAvatar(message.content.slice(prefixo.length + 10))
message.channel.send(new Discord.RichEmbed()
.setTitle("Avatar setado para:")
.setImage(message.content.slice(prefixo.length + 10)))
}
if(!lider){
  message.reply("**ñ**")
}}

          if(message.content.toLowerCase() === (prefixo + "teste")){
            message.channel.send("oi").then(m => {
              setTimeout(function () {m.react("↙")}, 500)
              setTimeout(function () {m.react("⬇")}, 1000)
              setTimeout(function () {m.react("↘")}, 1500)
              setTimeout(function () {m.react("⬅")}, 2000)
              setTimeout(function () {m.react("⏺")}, 2500)
              setTimeout(function () {m.react("➡")}, 3000)
              setTimeout(function () {m.react("↖")}, 3500)
              setTimeout(function () {m.react("⬆")}, 4000)
              setTimeout(function () {m.react("↗")}, 4500)
            })
          }

          if(message.content.startsWith(prefixo + "traduzir")){
          var n = 2;
          var a = message.content.split(' ')
          var first = (a[1])
          var second =  a.slice(n).join(' ')
          translate(second, {to: first}).then(res => {
            message.channel.send(new Discord.RichEmbed()
            .setColor(0x7ea3e)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription('Mensagem em **' + res.from.language.iso + '** traduzida para **' + first + '**')
            .addField("Mensagem original:", "```" + second + "```")
            .addField("Mensagem traduzida:", "```" + res.text + "```")
            .setThumbnail("https://cdn.discordapp.com/attachments/436691414559096872/437729250607366145/main-qimg-53c93d703f5e77b7f824e38d349dee5d.png"))
          }).catch(err => {
            message.channel.send(new Discord.RichEmbed()
            .setColor(0x7ea3e)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription('Esse idioma não existe'))
            }).catch(erro => console.log(erro));}

        if(message.content.startsWith(prefixo + "dev")){
          if(!args[1]) return message.channel.send("Escreva algo")
          if(args[1]){
          var v = bot.users.get(liderid)
          var x = message.content.substring(prefixo.length + 4)
          v.send(new Discord.RichEmbed()
          .setColor(0x4286f4)
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setDescription(x)
          .setFooter("Comando: 2!dev")).catch(erro => console.log(erro));}
        }

        if(message.content.startsWith(prefixo + "info")){
          const emojo = bot.emojis.find("name", "abc123abc");
          const npma = bot.emojis.find("name", "npmmpn");
          const djsa = bot.emojis.find("name", "djsdjs");
          const node = bot.emojis.find("name", "nodejsjsnode");
          var duration = moment.duration(bot.uptime).format(" D[ d], H[ h], m[ mins], s[ segs]");
          message.channel.send(new Discord.RichEmbed()
          .setThumbnail(bot.user.avatarURL)
          .setTitle("Info do Miojo 2.0")
          .setDescription('⏰ Uptime: ' + duration + '\n' + emojo + ' Memória utilizada: ' + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb \n` + ':person_with_pouting_face: Total de usuários: ' + bot.users.size + '\n' + ':hash: Total de canais: ' + bot.channels.size + '\n' + ':globe_with_meridians: Total de servers: ' + bot.guilds.size + '\n' + npma + ' Npm version: 5.6.0 \n' + node + ' Node.js version: 9.5.0 \n' + djsa + ' Discord.js version: 11.3 \n'))
        }

        if(message.content.startsWith(prefixo + "kick")){
          if (message.member.hasPermission("KICK_MEMBERS")) {
          let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
          let useer = message.mentions.users.first()
          if (useer.id === message.author.id) return message.channel.send("Você não pode se expulsar " + useer)
          if(!kuser) return message.channel.send("Mencione um usário");

          function reason() {
          var n = 2;
          var a = message.content.split(' ')
          var first = a.slice(0, n).join(' ')
          var second =  a.slice(n).join(' ')
          if (!second) return 'Sem razão especificada'
          if (second) return second}

          if(kuser.kickable){
          kuser.kick(reason());
          message.channel.send(new Discord.RichEmbed()
          .setTitle("KICK")
          .setColor(0x4286f4)
          .addField("membro expulso", "**Nome:** " + kuser + "  ||  " + useer.tag + "\n**ID:** " + kuser.id)
          .addField("expulso pelo:", "**Nome:** <@" + message.author.id + "> \n**ID:** " + message.author.id)
          .addField("expulso no:", message.channel)
          .addField("tempo:", message.createdAt.toLocaleString())
          .addField("razão:", reason()))}
        if(!kuser.kickable){message.channel.send("Esse membro não pode ser expulso")}}
        else{message.channel.send("Você não tem permissão")}}

      if(message.content.startsWith(prefixo + "ban")){
        if (message.member.hasPermission("BAN_MEMBERS")) {
        let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        let useer = message.mentions.users.first()
        if (useer.id === message.author.id) return message.channel.send("Você não pode se expulsar " + useer)
        if(!kuser) return message.channel.send("Mencione um usário");

        function reason() {

        var n = 2;
        var a = message.content.split(' ')
        var first = a.slice(0, n).join(' ')
        var second =  a.slice(n).join(' ')

        if (!second) return 'Sem razão especificada'
        if (second) return second
        }

        if(kuser.bannable){
        kuser.ban(reason());
        message.channel.send(new Discord.RichEmbed()
        .setTitle("BAN")
        .setColor(0x4286f4)
        .addField("membro banido", "**Nome:** " + kuser + "  ||  " + useer.tag + "\n**ID:** " + kuser.id)
        .addField("banido pelo:", "**Nome:** <@" + message.author.id + "> \n**ID:** " + message.author.id)
        .addField("banido no:", message.channel)
        .addField("tempo:", message.createdAt.toLocaleString())
        .addField("razão:", reason()))
      }
      if (!kuser.bannable)
        message.channel.send("Esse membro não pode ser banido")
      }
      else{
        message.channel.send("Você não tem permissão")
      }
    }

    if(message.content === ("<@434785793232338954>")){
      message.channel.send("<@"+message.author.id+"> meu prefixo no `"+message.guild.name+"` é `" + prefixo +"`").catch(erro => console.log(erro))
    }

 if(message.content.startsWith(prefixo + "canal")){
   let canal = message.mentions.channels.first()
   if (canal){
   var a = message.content.slice(prefixo.length)
   var y = a.indexOf(">")
   var f = a.slice(y + 1)
   if (f){
   canal.send(f).catch(erro => message.channel.send(`Não tenho permissão para enviar mensagem no canal ${canal}`)).catch(erro => message.author.send('Não posso enviar mensagens nos canais: `' + message.channel.name + "`, `" + canal.name +"`"));
   }if (!f){
     message.channel.send("Escreva alguma mensagem para eu poder enviar").catch(erro => message.author.send('Não posso enviar mensagens no canal: `' + message.channel.name + "`"))
   }}
   if (!canal){
     var k = message.content.slice(prefixo.length + 6)
     if (k){
    message.channel.send(k).catch(erro => message.author.send('Não posso enviar mensagens no canal: `' + message.channel.name + "`"))
  }if (!k){
    message.channel.send("Escreva alguma mensagem para eu poder enviar").catch(erro => message.author.send('Não posso enviar mensagens no canal: `' + message.channel.name + "`"))
  }}}

  if(message.content.startsWith(prefixo + "slinfo")){
    let useer = message.mentions.users.first() || message.author;
    let roy = message.mentions.members.first() || message.member;
    message.channel.send(new Discord.RichEmbed()
    .setThumbnail(useer.avatarURL)
    .setColor(roy.highestRole.hexColor)
    .addField("Nome:", useer.username, true)
    .addField("Tag:", useer.discriminator, true)
    .addField("Username:", useer.tag, true)
    .addField("ID:", useer.id, true))
  }

if (message.content.startsWith(prefixo + "await")) {

    const msgs = await message.channel.awaitMessages(msg => {
      if(msg.content.startsWith("oi")){
      if(msg.author.id === message.author.id) return console.log(msg.content);
      if(msg.author.id !== message.author.id) return;
      }
    }, {time: 15000})
  }

  if(message.content.startsWith(prefixo + "userinfo")){
    let useer = message.mentions.users.first() || message.author;
    let roy = message.mentions.members.first() || message.member;

    if (useer.bot) {
      message.channel.send(new Discord.RichEmbed()
      .setDescription(`**Link para convite:** [Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${useer.id}&scope=bot&permissions=0)`))
    }

    if (!useer.bot) {

    function formatDate(date) {
      var monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Augosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
      ];
      var diaNomes = [
        "Domingo", "Segunda-feira", "Terça-feira",
        "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
      ];
      var minutos = roy.joinedAt.getMinutes();
      var hora = roy.joinedAt.getHours();
      var day = roy.joinedAt.getDate();
      var dia = roy.joinedAt.getDay();
      var monthIndex = roy.joinedAt.getMonth();
      var year = roy.joinedAt.getFullYear();
      var j = ("0" + minutos).slice(-2)

      return diaNomes[dia] + ', ' + day + ' de ' + monthNames[monthIndex] + ' de ' + year + ' às ' + hora + ':' + j;
    }

    function formatDato(date) {
      var monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Augosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
      ];
      var diaNomes = [
        "Domingo", "Segunda-feira", "Terça-feira",
        "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
      ];
      var minutos = useer.createdAt.getMinutes();
      var hora = useer.createdAt.getHours();
      var day = useer.createdAt.getDate();
      var dia = useer.createdAt.getDay();
      var monthIndex = useer.createdAt.getMonth();
      var year = useer.createdAt.getFullYear();
      var j = ("0" + minutos).slice(-2)

      return diaNomes[dia] + ', ' + day + ' de ' + monthNames[monthIndex] + ' de ' + year + ' às ' + hora + ':' + j;
    }

    function gume(){
      if (useer.presence.game) {
        if (useer.presence.game.type === 0) return "**Jogando** "+ useer.presence.game.name
        if (useer.presence.game.type === 1) return "**Transmitindo** "+ useer.presence.game.name
        if (useer.presence.game.type === 2) return "**Ouvindo** "+ useer.presence.game.name
        if (useer.presence.game.type === 3) return "**Assistindo** "+ useer.presence.game.name
      }
      if (!useer.presence.game) return "Sem atividade"
    }

    function stutus(){
        if (useer.presence.status === "dnd") return "Não pertube"
        if (useer.presence.status === "idle") return "Ausente"
        if (useer.presence.status === "online") return "Disponível"
        if (useer.presence.status === "offline") return "Offline"
      }
      function stji(){
        const on = bot.emojis.find("id", "438399398808911882");
        const off = bot.emojis.find("id", "438399398762905600");
        const idl = bot.emojis.find("id", "438399398796460032");
        const dn = bot.emojis.find("id", "438399396548313091");
          if (useer.presence.status === "dnd") return dn
          if (useer.presence.status === "idle") return idl
          if (useer.presence.status === "online") return on
          if (useer.presence.status === "offline") return off
        }
      /*  function oi(){

      }*/
      //console.log(check.message.content)
    message.channel.send(new Discord.RichEmbed()
    .setThumbnail(useer.avatarURL)
    .setColor(roy.highestRole.hexColor)
    .addField("Username:", useer.tag, true)
    .addField("ID:", useer.id, true)
    .addBlankField(false)
    .addField("Maior cargo:", roy.highestRole.name, true)
    .addField("Atividade:", gume(), true)
    .addField(stji()+" | Status:", stutus(), true)
    .addField("Entrou aqui em:", (formatDate(new Date())), false)
    .addField("Conta criada em:", (formatDato(new Date())), false)).catch(erro => console.log(erro))
}}

if (message.content.startsWith(prefixo + "nick")){
  let roy = message.mentions.members.first() || message.member;
  var a = message.content.slice(prefixo.length)
  var y = a.indexOf(">")
  var f = a.slice(y + 1)
  if(lider) {
  roy.edit({
  nick: f
})
message.channel.send("Nickname do " +roy.user.username+ " alterado para: "+f)
}
  if(!lider) {
    message.channel.send("Não")
  }}

if (message.content.startsWith(prefixo + "loop")){
  if(lider){
  message.channel.send('0 : 00').then(teste => {
        setInterval(function(){
          function oi(){
            var a = teste.content
            var b = a.length
            var c = b*1
            var d = a.slice(c-2)
            var e = d*1
            var f = e+2

            var g = a.substring(0,2)
            var h = g*1
            var i = h+1
            var j = ("0" + f).slice(-2)

          if(e === 58) return i+' : 00'
          if(e !== 58) return h+' : '+j
        }
          teste.edit(oi())
        }, 2000)
      }).catch(erro => console.log(erro))
    }
    if(!lider){
      message.channel.send("Não pode")
    }
}

 /*if(message.content.startsWith(prefixo + "conta")){
   //message.channel.send(message.mentions.users.first().size)
   console.log(message.content)
   var h = message.mentions.channels.first()
   var a = message.content
   var x = a.split("").join("")
   var y = a.indexOf(">")
   var h = message.mentions.channels.first()


  console.log(h.id);


   console.log(y)
 }*/

        if(message.content.startsWith(prefixo + "avatar")){
          let user = message.mentions.users.first() || message.author;

          message.channel.send(new Discord.RichEmbed()
          .setColor(0x4286f4)
          .setTitle("Avatar de " + user.username)
          .setImage(user.displayAvatarURL))
        }

        if(message.content.startsWith(prefixo + "trig")){
          let user = message.mentions.users.first() || message.author;

          message.channel.send(new Discord.RichEmbed()
          .setColor(0x4286f4)
          .setTitle("Avatar de " + user.username)
          .setImage(generate.triggered("user.avatarURL").then(url => { console.log(url) })))
        }

        if(message.content.startsWith(prefixo + "inverter")){
          if(!args[1]) return message.channel.send("Escreva algo")
          if (args[1]){
          var x = message.content.substring(prefixo.length + 9)
          message.channel.send(x.split("").reverse().join(""))
        }}

        if(message.content.startsWith(prefixo + "fale")){
          if(!args[1]) return message.channel.send("Escreva algo")
          if(args[1]){
            message.channel.send(message.content.substring(prefixo.length + 5));
          }}

        /*if(message.content.toLowerCase().startsWith(prefixo + "roles")){

          var y = message.guild.roles.map(r => r.name + "' , value: " + r.calculatedPosition + " }").join(",")
          //var oi = y.sort(sortfunction)
          var array = JSON.parse("[" + y + "]");
          //array.sort()

          //var i = message.guild.roles.find('position', array).map(r => r.name).join("\n");
          console.log(y)
          //message.channel.send(oi)
        }*/

        if(message.content.toLowerCase().startsWith(prefixo + "ship")){
          var a = Math.floor((Math.random() * 10) + 1);
          //parseInt
          var b = message.content.split(' ')
          var c = (b[1])
          var d = c.length
          var e = d / 3
          var f = e.toFixed(0)
          var som = d - f
          var al = Math.floor((Math.random() * (d - f + 1)) + f);
          var fo = c.split("").reverse().join("")
          var y = fo.slice(al)
          var fu = y.split("").reverse().join("")
          //var cok = message.content.substring(prefixo.length + 5, prefixo.length + 5 + al)

          var h = (b[2])
          var i = h.length
          var j = i / 3
          var k = j.toFixed(0)
          var m = Math.floor((Math.random() * (i - k + 1)) + k);
          var oo = m * (-1)
          var o = h.slice(m)

          message.channel.send("nome 1: " + c + "\nnome 2: "+h+"\nShip: " +fu+o+ "\n"+al)
          if(a === 1){
            message.channel.send("10%")
          }
          if(a === 2){
            message.channel.send("20%")
          }
          if(a === 3){
            message.channel.send("30%")
          }
          if(a === 4){
            message.channel.send("40%")
          }
          if(a === 5){
            message.channel.send("50%")
          }
          if(a === 6){
            message.channel.send("60%")
          }
          if(a === 7){
            message.channel.send("70%")
          }
          if(a === 8){
            message.channel.send("80%")
          }
          if(a === 9){
            message.channel.send("90%")
          }
          if(a === 10){
            message.channel.send("100%")
          }
        }

        if(message.content.toLowerCase().startsWith(prefixo + "serverinfo")){
          var voz = message.guild.channels.filter(c=>c.type==="voice").size
          var texto = message.guild.channels.filter(c=>c.type==="text").size

          function formatDate(date) {
            var monthNames = [
              "Janeiro", "Fevereiro", "Março",
              "Abril", "Maio", "Junho", "Julho",
              "Augosto", "Setembro", "Outubro",
              "Novembro", "Dezembro"
            ];

            var diaNomes = [
              "Domingo", "Segunda-feira", "Terça-feira",
              "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
            ]

            var minutos = message.guild.createdAt.getMinutes();
            var hora = message.guild.createdAt.getHours();
            var day = message.guild.createdAt.getDate();
            var dia = message.guild.createdAt.getDay();
            var monthIndex = message.guild.createdAt.getMonth();
            var year = message.guild.createdAt.getFullYear();
            var j = ("0" + minutos).slice(-2)

            return diaNomes[dia] + ', ' + day + ' de ' + monthNames[monthIndex] + ' de ' + year + ' às ' + hora + ':' + j;
          }

          message.channel.send(new Discord.RichEmbed()
          .setColor(0x48d11f)
          .setAuthor("serverinfo", message.author.avatarURL)
          .addField("Nome:", message.guild.name, true)
          .addField("Dono:", message.guild.owner.user.tag, true)
          .addField("Usuários:", message.guild.members.size - message.guild.members.filter(m=>m.user.bot).size, true)
          .addField("BOTs:", message.guild.members.filter(m=>m.user.bot).size, true)
          .addField("Membros no total:", message.guild.members.size, true)
          //.addField("Cargos:", message.guild.roles.map(r => r.name).join(", "), true)
          .addField("Cargos:", message.guild.roles.size, true)
          .addField("Canais de texto:", texto, true)
          .addField("Canais de voz:", voz, true)
          .addField("Canais no total:", voz + texto, true)
          //.addField("Criado em:", message.guild.createdAt.toLocaleString(), true)
          .addField("Data da criação:", (formatDate(new Date())), false)
          .setThumbnail(message.guild.iconURL)
          .setFooter("Comando ultilizado por " + message.author.username))
        }

        if(message.content.startsWith(prefixo + "sa 1")){
        if(lider){
        const lama = args[1];
        bot.user.setActivity(lama, { type: 'PLAYING' })
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x48d11f)
        .setAuthor("2!sa", message.author.avatarURL)
        .setTitle("Atividade alterada para: Jogando " + lama)
        .setFooter(message.author.username + " meu líder"))
        }
        if(!lider){
            message.channel.send(new Discord.RichEmbed()
            .setColor(0xcc2020)
            .setAuthor("2!sa", message.author.avatarURL)
            .setTitle("Você não tem permissão para este comando")
            .setFooter(message.author.username + " bobinho"))
        }}

        if(message.content.startsWith(prefixo + "sa 2")){
        if(lider){
        const lama = args[1];
        bot.user.setActivity(lama, { type: 'LISTENING' })
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x48d11f)
        .setAuthor("2!sa", message.author.avatarURL)
        .setTitle("Atividade alterada para: Ouvindo " + lama)
        .setFooter(message.author.username + " meu líder"))
        }
        if(!lider){
            message.channel.send(new Discord.RichEmbed()
            .setColor(0xcc2020)
            .setAuthor("2!sa", message.author.avatarURL)
            .setTitle("Você não tem permissão para este comando")
            .setFooter(message.author.username + " bobinho"))
        }}

        if(message.content.startsWith(prefixo + "sa 3")){
        if(lider){
        const lama = args[1];
        bot.user.setActivity(lama, { type: 'WATCHING' })
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x48d11f)
        .setAuthor("2!sa", message.author.avatarURL)
        .setTitle("Atividade alterada para: Assistindo " + lama)
        .setFooter(message.author.username + " meu líder"))
        }
        if(!lider){
            message.channel.send(new Discord.RichEmbed()
            .setColor(0xcc2020)
            .setAuthor("2!sa", message.author.avatarURL)
            .setTitle("Você não tem permissão para este comando")
            .setFooter(message.author.username + " bobinho"))
        }}



/*PLAYING
STREAMING
LISTENING
WATCHING*/
})

bot.login(process.env.BOT_TOKEN);
