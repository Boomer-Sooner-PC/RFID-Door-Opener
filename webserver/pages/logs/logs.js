const fs = require("fs");

module.exports = {execute};

function execute (data, res) {
    let text = fs.readFileSync("./pages/logs/logs.html", "utf-8"); // get the html

    if (data && data.includes("&")) {
        start = parseInt(data.split("&")[0]);
        end = parseInt(data.split("&")[1]);
        
        json = JSON.parse(fs.readFileSync("./data/logs.json", "utf-8"));
        keys = Object.keys(json).sort((a, b) => parseInt(a) -parseInt(b));
        
        logs = []
        for (key of keys) {
            key = parseInt(key);
            if (key > start && key < end) {
                logs.push({"time": key, "data": json[key]});
            }
        }
        csv = "TIME,ID,NAME,STATUS";
        for (log of logs) {
            row = `\n${new Date(log.time).toString()},${log.data.id},TEMP,${log.data.opened}}`
            csv+=row;
        }
        res.writeHead(200, 'text/csv');
        res.end(csv);
        return;
    }

    res.writeHead(200, 'text/html') 
    res.end(text); // return html
}