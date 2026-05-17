const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/pending',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      console.log(data);
    } catch (e) {
      console.error('parse error', e.message);
    }
  });
});

req.on('error', (err) => {
  console.error('request error', err.message);
});
req.end();
