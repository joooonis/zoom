import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

io.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
  });
});

server.listen(3000, () => console.log(`Listening on http://localhost:3000`));
