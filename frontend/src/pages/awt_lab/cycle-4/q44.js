const http = require('http');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    switch (method) {
      case 'GET':
        res.statusCode = 200;
        res.end('GET request received. Hello from the server!');
        break;

      case 'POST':
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          res.statusCode = 201;
          res.end(`POST request received. Data: ${body}`);
        });
        break;

      case 'PUT':
        let updateData = '';
        req.on('data', chunk => {
          updateData += chunk.toString();
        });
        req.on('end', () => {
          res.statusCode = 200;
          res.end(`PUT request received. Updated data: ${updateData}`);
        });
        break;

      case 'DELETE':
        res.statusCode = 200;
        res.end('DELETE request received. Resource deleted.');
        break;

      default:
        res.statusCode = 405;
        res.end(`Method ${method} not allowed.`);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
