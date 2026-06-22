const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5555;
const MIME_TYPES = {
  '.html': 'text/html',
  '.json': 'application/json',
  '.js': 'application/javascript',
};

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'provider.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
  console.log(`Manifest at http://localhost:${PORT}/manifest.json`);
  console.log('');
  console.log('To launch: openfin --launch --config http://localhost:5555/manifest.json');
});
