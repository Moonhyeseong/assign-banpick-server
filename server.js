const express = require('express');
const cors = require('cors');

const connect = require('./models');

connect();

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () => {
  console.log('listening on 8080');
});

app.use(cors());
app.use('/', require('./router/start.js'));
app.use('/', require('./router/banpick.js'));
