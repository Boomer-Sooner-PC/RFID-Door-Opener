const fs = require("fs");

module.exports = {execute};

function execute (password, name, id, res) {
    if (password === process.CONFIG.masterPassword) {
        json = JSON.parse(fs.readFileSync("./webserver/data/cards.json", 'utf-8'))
        json.push({"number": parseInt(id), "name": decodeURIComponent(name)})
        fs.writeFileSync("./webserver/data/cards.json", JSON.stringify(json, null, 2));
        res.end("sucsess");
    }
    else {
        res.end("incorrect password");
    }
}
// please