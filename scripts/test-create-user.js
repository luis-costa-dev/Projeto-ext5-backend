const http = require('http');

const data = JSON.stringify({
  id: 'test-' + Date.now(),
  name: 'Teste',
  email: 'unique.' + Date.now() + '@example.com',
  password: 'Teste123456',
});

const opts = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(opts, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

req.write(data);
req.end();
