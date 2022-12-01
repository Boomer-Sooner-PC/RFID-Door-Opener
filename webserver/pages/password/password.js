const fs = require("fs");

module.exports = {execute};

function execute (data, res) {
    let text = fs.readFileSync("./webserver/pages/password/password.html", "utf-8"); // get the html
    res.writeHead(200, 'text/html') 
    res.end(text); // return html
}