const fs = require("fs");

module.exports = {execute};

function execute (password, res) {
    if (password === process.CONFIG.masterPassword) {
        json = JSON.parse(fs.readFileSync("./webserver/data/cards.json", 'utf-8'))
        res.end(JSON.stringify(json));
        
    }
    else {
        res.end("incorrect password");
    }


}