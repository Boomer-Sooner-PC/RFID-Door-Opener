const fs = require("fs");

module.exports = {execute};

function execute (password, timestamp, id, action, res) {
    if (password === process.CONFIG.masterPassword) {
        d = new Date(timestamp * 1000)
        fiN = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
        try{
            json = JSON.parse(fs.readFileSync(`./webserver/data/logs/${fiN}.json`, "utf-8"));
        }
        catch (e) {
            json = {}
        }
        json[timestamp] = {
            "id": id,
            "opened": action
        }
        fs.open(`./webserver/data/logs/${fiN}.json`, 'w', () => {
            fs.writeFileSync(`./webserver/data/logs/${fiN}.json`, JSON.stringify(json, null, 2));
            res.end("sucsess");
        })
    }
    else {
        res.end("incorrect password");
    }
}