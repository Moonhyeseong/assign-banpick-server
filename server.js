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
const io = socket(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', require('./router/start.js'));
app.use('/', require('./router/banpick.js'));
