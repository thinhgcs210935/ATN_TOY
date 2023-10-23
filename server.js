const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //Set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    let statusCode = 200;
    switch (req.url) {
        case '/':
            path += 'index.ejs';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.ejs';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            return;c
        case '/product-list':
            path += 'productlist.ejs';
            res.statusCode = 200;
            break;
        case '/addproduct':
            path += 'addproduct.ejs';
            res.statusCode = 200;
            break;
        default:
            path += '404.ejs';
            res.statusCode = 404;
            break;
    }

    //Send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500; // Internal Server Error
            res.end();
        } else {
            res.statusCode = statusCode;
            res.write(data);
            res.end();
        }
    })

});

server.listen(3003, () => {
    console.log('Listening for request on port 3003')
});