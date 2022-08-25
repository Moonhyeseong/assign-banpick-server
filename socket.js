const socket = require('socket.io');

room.on('connection', socket => {
  console.log('socket.io connection');
  socket.join('default');

  socket.on('news', payload => {
    console.log(payload);
  });

  socket.on('ready', payload => {
    socket.to(payload).emit('ready', payload);
  });

  socket.on('joinRoom', payload => {
    socket.leave('default');
    socket.join(payload);

    socket.to(payload).emit('join', '대기방에 입장하셧습니다');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
