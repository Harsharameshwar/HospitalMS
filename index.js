const http = require("http");
const app = require("./api/index");
const server = http.createServer(app);
const { PORT } = require("./envFiles");

// const fs = require('fs')
// const https = require('https')
// https
//   .createServer(
//     {
//       key: fs.readFileSync('C:/Certbot/archive/mydesk.tk/key.pem'),
//       cert: fs.readFileSync('C:/Certbot/archive/mydesk.tk/cert1.pem'),
//       ca: fs.readFileSync('C:/Certbot/archive/mydesk.tk/chain1.pem'),
//     },
//     app
//   )
//   .listen(443, () => {
//     console.log('Listening...')
//   })

server.listen(PORT, (req, res) => {
  console.log(`Server is up and running on port ${PORT}`);
});


