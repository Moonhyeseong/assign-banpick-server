const mongoose = require('mongoose');

const dbUrl =
  'mongodb+srv://mhs970:745263sy@cluster0.viyda96.mongodb.net/?retryWrites=true&w=majority';

// mongoose 연결
const connect = () => {
  mongoose.connect(
    dbUrl,
    {
      dbName: 'banpick', // DB name
      useNewUrlParser: true,
    },
    error => {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    }
  );
};

mongoose.connection.on('error', error => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;
