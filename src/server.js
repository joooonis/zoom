import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () =>
  console.log('Listening on port http://localhost:3000');

// http server
const server = http.createServer(app);
// webSocket server on http server
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anonymous';
  console.log('connection established!! ✨');

  // add EventListeners
  socket.on('close', () => console.log('close connection ❌'));
  socket.on('message', (message) => {
    const parsed = JSON.parse(message);
    switch (parsed.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname} : ${parsed.payload}`)
        );
      case 'nickname':
        socket['nickname'] = parsed.payload;
    }
  });
});

server.listen(3000, handleListen);
