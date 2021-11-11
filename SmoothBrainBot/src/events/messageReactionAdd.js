module.exports = async (bot, reaction, user) => {
  const verified = "741159992932958339";

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (user.id == "189746913631797249") return;
  if (user.id == "707319836329639986") return;
  if (user.id == "404809534079762442") return;
  if (user.id == "762059412114112543") return;

  if (reaction.message.channel.id == "741160557062914078") {
    let emoji = reaction.emoji.name;
    switch (emoji) {
      case "✅":
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add(verified);
        reaction.users.remove(user);
        break;
    }
  }
};
