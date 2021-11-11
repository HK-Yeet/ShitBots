module.exports = (bot) => {
  console.log(`Logged in as ${bot.user.tag}!`);
  setInterval(function () {
    bot.user.setPresence({ activity: { name: "Visual Studio Code", type: "PLAYING" }, status: 'idle' })
  }, 10000);
};
