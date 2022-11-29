const fs = require("fs");

module.exports = {execute};

function execute (password, timestamp, id, action, res) {
    if (password === process.CONFIG.masterPassword) {
        fiN = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
        try{
            json = JSON.parse(fs.readFileSync(`./data/logs/${fiN}.json`, "utf-8"));
        }
        catch (e) {
            json = {}
        }
        json[timestamp] = {
            "id": id,
            "opened": action === "opened" ? true : false
        }
        fs.writeFileSync(`./data/logs/${fiN}.json`, JSON.stringify(json, null, 2));
        res.end("sucsess");
    }
    else {
        res.end("incorrect password");
    }
}