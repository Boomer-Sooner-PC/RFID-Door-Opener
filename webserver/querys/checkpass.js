const fs = require("fs");

module.exports = {execute};

function execute (password, res) {    
    if (password == process.CONFIG.masterPassword){
        res.end(fs.readFileSync("./webserver/data/pass", 'utf-8'));
        fs.writeFileSync("./webserver/data/pass", "");
    }
    else {
        res.end("incorrect password")
    }
    
}