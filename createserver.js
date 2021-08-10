const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost';
const port = '3000';
const server = http.createServer((req, res) => {
    console.log(`Request from ${req.url} and method is ${req.method}`);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') {
            fileUrl = '/index.html'
        } else { fileUrl = req.url }

        var filepath = path.resolve('./public' + fileUrl)
        var fileext = path.extname(filepath);
        if (fileext == '.html') {
            fs.exists(filepath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1> error 404: ' + fileUrl + ' does not exists </h1></body></html>')
                }
                res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(filepath).pipe(res);

            })
        }
        else{
            res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>error 404: ' + fileUrl + ' not a HTML file</h1></body></html>')
        }
    }else{
        res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>error 404: ' + fileUrl + ' not supported file</h1></body></html>')
    }



    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1>Server connection successful</h1></body></html>')
})
server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
})