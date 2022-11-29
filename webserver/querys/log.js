const fs = require("fs");

module.exports = {execute};

function execute (password, timestamp, id, action, res) {
    if (password === process.CONFIG.masterPassword) {
        json = JSON.parse(fs.readFileSync("./data/logs.json", "utf-8"));
        json[timestamp] = {
            "id": id,
            "opened": action === "opened" ? true : false
        }
        fs.writeFileSync("./data/logs.json", JSON.stringify(json, null, 2));
        res.end("sucsess");
    }
    else {
        res.end("incorrect password");
    }
}