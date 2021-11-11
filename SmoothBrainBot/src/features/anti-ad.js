module.exports = (bot) => {
  const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
      guild.fetchInvites().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true);
            return;
          }
        }

        resolve(false);
      });
    });
  };

  bot.on("message", async (message) => {
    const { guild, content } = message;
    if (!guild) return;

    if (content.includes("discord.gg/")) {
      const code = content.split("discord.gg/")[1];

      const isOurInvite = await isInvite(guild, code);
      if (!isOurInvite) {
        message.delete();
        return bot.quickEmbed(
          message.channel,
          "No Advertising",
          `You thought ${message.author}!`,
          true
        );
      }
    }
    if (content.includes("discord.com/invite/")) {
      const code = content.split("discord.com/invite/")[1];
      const isOurInvite = await isInvite(guild, code);
      if (!isOurInvite) {
        message.delete();
        return bot.quickEmbed(
          message.channel,
          "No Advertising",
          `You thought ${message.author}!`,
          true
        );
      }
    }
  });

  bot.on("messageUpdate", async (oldMessage, message) => {
    const { guild, content } = message;

    if (!guild) return;

    if (content.includes("discord.gg/")) {
      const code = content.split("discord.gg/")[1];

      const isOurInvite = await isInvite(guild, code);
      if (!isOurInvite) {
        message.delete();
        return bot.quickEmbed(
          message.channel,
          "No Advertising",
          `You thought you bypass the filter by editing the message. You were wrong ${message.author}!`,
          true
        );
      }
    }
    if (content.includes("discord.com/invite/")) {
      const code = content.split("discord.com/invite/")[1];
      const isOurInvite = await isInvite(guild, code);
      if (!isOurInvite) {
        message.delete();
        return bot.quickEmbed(
          message.channel,
          "No Advertising",
          `You thought you bypass the filter by editing the message. You were wrong ${message.author}!`,
          true
        );
      }
    }
  });
};
