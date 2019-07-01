const fs = require('fs');
const http = require('http');
const https = require('https');

const app = require("./app");
const config = require("./config");
const db = require("./db");

const bot = require('./controllers/bot');

// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/minter-scoring.space/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/minter-scoring.space/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/minter-scoring.space/chain.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };

// Starting both http & https servers
const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });
