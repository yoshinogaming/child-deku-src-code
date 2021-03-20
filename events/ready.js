const conf = require("../config.json")

module.exports = client => {
  console.log(`${client.user.username} is now ready to be online.`)

  function randomStatus() {
//    let status = [`${client.guilds.cache.size.toLocaleString()} Servers`, `${client.guilds.cache.size.toLocaleString()} Servers`]
    let status = [`Maintenance`]
    let rstatus = Math.floor(Math.random() * status.length);
      
    client.user.setActivity(status[rstatus], {type: "WATCHING"});
    client.user.setStatus("idle")
  }
  setInterval(randomStatus, 60000);
}