const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const connect = require('./models');
const bodyParser = require('body-parser');

connect();

const app = express();
const server = app.listen(8080, () => {
  console.log('listening on 8080');
});
const io = socket(server, { path: '/socket.io' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

io.on('connection', socket => {
  console.log('socket.io connection');
  socket.on('news', payload => {
    console.log(payload);
    socket.emit('reply', '브라우저야 안녕');
  });

  socket.on('ready', payload => {
    socket.broadcast.emit('ready', payload);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/', require('./router/start.js'));
app.use('/', require('./router/banpick.js'));
app.use('/', require('./router/user.js'));
app.use('/', require('./router/gameInfo.js'));
