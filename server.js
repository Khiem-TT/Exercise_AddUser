let http = require('http');
let fs = require('fs');
let qs = require('qs');

let users = [];

let server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let userInfo = qs.parse(data);
            users.push(userInfo);
            console.log(users);
            return res.end('Add success!');
        });
        req.on('error', () => {
            console.log('error');
        });
    }
});

server.listen(8080, () => {
    console.log(`Server running in http://localhost:8080`);
});