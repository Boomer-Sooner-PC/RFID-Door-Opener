const fs = require("fs");

module.exports = {execute};

function execute (password, name, id, res) {
    if (password === process.CONFIG.masterPassword) {
        json = JSON.parse(fs.readFileSync("./webserver/data/cards.json", 'utf-8'))
        if (decodeURIComponent(id) == '') {
            id = fs.readFileSync("./webserver/data/last", 'utf-8');
            console.log(id)
        }
        name = decodeURIComponent(name);
        json.push({"number": parseInt(id), "name": name})
        fs.writeFileSync("./webserver/data/cards.json", JSON.stringify(json, null, 2));
        res.end("sucsess");
    }
    else {
        res.end("incorrect password");
    }
}
// please