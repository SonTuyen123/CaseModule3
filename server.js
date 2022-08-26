const http = require('http');
const url = require("url");
const fs = require("fs");

const AuthController = require("./src/controller/auth.controller");
const port = 9000;


let authController = new AuthController();

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "min.js": "text/javascript",
    "css": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
    "svg": "image/svg+xml",
    "ico": "image/vnd.microsoft.icon"
};
const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let urlPath = urlParse.pathname;
    let method = req.method;
    const filesDefences = req.url.match(/\.js|\.css|\.jpg|\.png|\.gif|\.min.js|\.min.css|\.svg|\.ico/);

    if (filesDefences) {
        // console.log(filesDefences)
        // let filePath = filesDefences[0].toString();
        let extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        // console.log(extension)
        // if (filePath.includes('/css')){
        //     extension = mimeTypes[filesDefences[0].toString().split('/')[1]];
        // }
        // if (extension.includes('?')){
        //     extension = extension.split('?')[0];
        // }
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/views/template/" + req.url).pipe(res)
    }
    switch (urlPath) {
        case '/': {
            authController.showHomePage(req, res)
            break;
        }
        case '/login': {
            if (method === 'GET') {
                authController.showFormLogin(req, res)
            }
           else {
                authController.login(req, res)
            }
            break;
        }
    }
});
server.listen(port,()=> {
    console.log(`http://localhost:${port}`);
});