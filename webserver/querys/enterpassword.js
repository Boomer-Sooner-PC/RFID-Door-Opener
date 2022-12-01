const fs = require("fs");

module.exports = {execute};

function execute (password, res) {
    
    fs.writeFileSync("./webserver/data/pass", decodeURIComponent(password));
    res.end("Password submitted")

}