const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const settings = require("./storage/settings.json");

class CustomClient extends Discord.Client {
  constructor() {
    super({
      partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
    });
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.settings = settings;
  }
  loadEvents(dir) {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        this.loadEvents(path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const event = require(path.join(__dirname, dir, file));
          const eventName = file.split(".")[0];
          super.on(eventName, event.bind(null, this));
          console.log(`Loading event: ${eventName}`);
        }
      }
    }
  }
  loadCommands(dir) {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        this.loadCommands(path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const props = require(path.join(__dirname, dir, file));
          console.log(`Loading the command: ${props.help.name}`);
          this.commands.set(props.help.name, props);
          if (props.help.aliases) {
            props.help.aliases.forEach((alias) => {
              this.aliases.set(alias, props);
            });
          }
        }
      }
    }
    return this;
  }
  loadFeatures(dir) {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readFeatures(path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const feature = require(path.join(__dirname, dir, file));
          const featureName = file.split(".")[0];
          console.log(`Loading feature: ${featureName}`);
          feature(this);
        }
      }
    }
  }
  quickEmbed(channel, header, content, err) {
    let colour;
    if (err) colour = "RED";
    if (!err) colour = "GREEN";
    if (err == null) colour = "BLUE";
    let title;
    if (!header) {
      if (colour == "RED") title = "Error";
      if (colour == "GREEN") title = "Success";
      if (colour == "BLUE") title = "Info";
    } else {
      title = header;
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`${err ? "❌・" : ""}${title}`)
      .setColor(colour)
      .setDescription(content);
    let randomNum = Math.floor(Math.random() * 5);
    if (!randomNum) {
      embed.setFooter(
        `Made by ${this.settings.group}`,
        this.user.displayAvatarURL()
      );
    }
    if (
      !channel
        .permissionsFor(channel.guild.me)
        .has(["SEND_MESSAGES", "EMBED_LINKS"])
    )
      return;
    channel.send(embed);
    return this;
  }
  async start() {
    this.loadEvents("./events");
    this.loadCommands("./commands");
    this.loadFeatures("./features");
    this.login(this.settings.token);
  }
}

module.exports = CustomClient;
