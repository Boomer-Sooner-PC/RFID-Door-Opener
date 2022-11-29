const fs = require("fs");

module.exports = {execute};

function execute (data, res) {
    let text = fs.readFileSync("./webserver/pages/logs/logs.html", "utf-8"); // get the html

    if (data && data.includes("&")) {
        start = parseInt(data.split("&")[0]);
        end = parseInt(data.split("&")[1]);
        
        dates = getDatesInRange(new Date(start * 1000 + 86400000), new Date(end * 1000));

        json = JSON.parse(fs.readFileSync("./webserver/data/logs.json", "utf-8"));
        keys = Object.keys(json).sort((a, b) => parseInt(a) -parseInt(b));
        
        logs = []
        for (date of dates) {
            try {
                json = JSON.parse(fs.readFileSync(`./webserver/data/logs/${date}.json`));
                for (key in json) {
                    logs.push({"time": parseInt(key), "data": json[key]});
                }
            }
            catch (e) {}
        }

        
        console.log(logs)
        csv = "TIME,ID,NAME,STATUS";
        for (log of logs) {
            d = new Date(log.time * 1000)
            row = `#${`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`},${log.data.id},TEMP,${log.data.opened == 'true' ? "opened" : "rejected"}`
            csv+=row;
        }
        res.writeHead(200, 'text/html');
        res.end(fs.readFileSync("./webserver/pages/logs/showLogs.html", 'utf-8').replace("__", csv    ));
        return;
    }

    res.writeHead(200, 'text/html') 
    res.end(text); // return html
}

function getDatesInRange(startDate, endDate) {
const date = new Date(startDate.getTime());

const dates = [];

while (date <= endDate) {
    d = new Date(date);
    dates.push(`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`);
    date.setDate(date.getDate() + 1);
}
return dates;
}