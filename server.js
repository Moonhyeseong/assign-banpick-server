//index
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://mhs970:745263sy@cluster0.viyda96.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
  //db 접근
  db = client.db('banpick');

  app.listen(8080, function () {
    console.log('listening on 8080');
  });
});
