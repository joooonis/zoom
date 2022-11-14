import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
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

wss.on('connection', (socket) => {
  socket.send('hello!!!');
});

server.listen(3000, handleListen);
