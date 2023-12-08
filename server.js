const http = require('http');
const { NotionAPI } = require('notion-client');
const fs = require('fs');

const port = 3000;

const notion = new NotionAPI();

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve HTML page
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/getNotionData') {
        // Endpoint to fetch Notion data
        notion.getPage('067dd719a912471ea9a3ac10710e7fdf')
            .then(recordMap => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(recordMap));
            })
            .catch(error => {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});