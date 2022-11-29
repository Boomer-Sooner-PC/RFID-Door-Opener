const http = require('http');
const fs = require('fs');
const hostname = process.env.HOSTNAME || '127.0.0.1'
const port = process.env.PORT || 5000; // define port 

process.CONFIG = JSON.parse(fs.readFileSync(__dirname + '/webserver/.conf'));
const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    url = req.url.split("?")[0]; // devide the data
    data = req.url.split("?")[1];
    folders = [];
    for (folder of url.replace(/\s/g, "").split('/')) {
        if (folder !== "") folders.push(folder);
    };

    console.log(folders);

    if (folders[0] == "assets") {
        try {
            if (folders[1] == "images") res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(fs.readFileSync(`./assets/${folders[1]}/${folders[2]}`, "utf-8"));
            
        }
        catch {
            res.statusCode = 404;
            res.end()
        }
    }
    else if (folders[0] == "query") {
        switch (folders[1]) {
            case "cards":
                fn = require("./webserver/querys/cards");
                fn.execute(data, res)
                break;
            case "addcard":
                fn = require("./webserver/querys/addcard");
                fn.execute(data.split("&")[0], data.split("&")[1], data.split("&")[2], res);
                break;
            case "log":
                fn = require("./webserver/querys/log");
                data = data.split("&")
                fn.execute(data[0], data[1], data[2], data[3], res);
                break;
        }
    }
    else if (folders[0] === 'pages') {
        try {
            fetchPage(folders[1], data, res);
        }
        catch {
            res.statusCode = 404;
            res.end("404 Page Not Found")
        }
    }
    else if (folders[0] == undefined) {
        fetchPage("home", data, res);
    }
    else {
        res.statusCode = 404;
    }
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

function fetchPage(name, data, res) {
    fn = require(`./webserver/pages/${name}/${name}`);
    try {
        fn.execute(data, res);
    }
    catch (err) { console.log(err) } 
}