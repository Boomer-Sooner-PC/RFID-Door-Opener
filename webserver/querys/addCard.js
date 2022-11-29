const fs = require("fs");

module.exports = {execute};

function execute (password, id, res) {
    if (password === process.CONFIG.masterPassword) {
        json = JSON.parse(fs.readFileSync("./webserver/data/cards.json", 'utf-8'))
        json.push({"number": id, "name": null})
        fs.writeFileSync("./webserver/data/cards.json", JSON.stringify(json, null, 2));
        res.end("sucsess");
    }
    else {
        res.end("incorrect password");
    }
}