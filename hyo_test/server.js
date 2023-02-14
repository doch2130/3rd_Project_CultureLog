const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // 렌더링 엔진 모드를 ejs로 설정
app.set('views', __dirname + '/views'); // ejs이 있는 폴더를 지정

app.get('/', (req, res) => {
  res.render('index'); // index.ejs을 사용자에게 전달
});

// emit을 할때 객체는 전달 할 수 없다고 한다.
// json 형식이나 일반 데이터만 전달 가능
// 함수가 있는 경우에는 Null로 표기된다고 한다.
const roomList = {};

io.on('connection', (socket) => {
  //연결이 들어오면 실행되는 이벤트
  // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.

  console.log('uuid', uuid.v4());

  roomList[socket.id] = socket.id;
  console.log(roomList);

  //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
  // socket.emit('usercount', io.engine.clientsCount);
  // io로 바꾸면 다른 사람들도 인원이 업데이트가 된다.
  io.emit('usercount', io.engine.clientsCount);

  // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
  // socket.on('message', (msg) => {
  socket.on('message', (msg, roomname) => {
    //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
    console.log('Message received: ' + msg);

    // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
    // io.emit('message', msg);
    // io.to(socket.id).emit('message', msg);
    // io.to(방이름).emit으로 특정 방의 소켓들에게 신호를 보낼 수 있다.
    io.to(roomname).emit('message', msg);
  });

  //기본적으로 채팅방 하나에 접속시켜준다.
  // 기본
  // socket.join(socket.id);
  // 변경
  // const roomName = 'room' + roomList.length;
  const roomName = 'room1';
  socket.join(roomName);

  socket.emit('info', socket.id);

  socket.on('getRooms', () => {
    console.log('socket.id', socket.id);
    // console.log(JSON.stringify(roomList));
    // socket.emit('rooms', 'test');
    // socket.emit('rooms', JSON.stringify(roomList));

    // io.sockets.adapter.rooms rooms 리스트를 가져오는 함수이지만, emit으로는 전달이 안된다.
    // 버전에 따라서 되는 경우도 있는 것 같다.
    socket.emit('rooms', roomList);
    // socket.emit('rooms', io.sockets.adapter.rooms);
  });

  // 룸 전환 신호
  socket.on('joinRoom', (roomname, roomToJoin) => {
    socket.leave(roomname); // 기존의 룸을 나가고
    socket.join(roomToJoin); // 들어갈 룸에 들어간다.

    // 룸을 성공적으로 전환했다는 신호 발송
    socket.emit('roomChanged', roomToJoin);
  });
});

// const debug = io.of('/debug');
// debug.on('connection', (socket) => {
//   roomList['socketID'] = socket.id;
//   console.log('debug connection');
//   // 룸의 목록 요청시 / 네임스페이스의 룸 목록 반환
//   socket.on('getRooms', () => {
//     // 다른 네임스페이스의 객체에도 접근할 수 있다.
//     console.log('io.sockets.adapter.rooms', io.sockets.adapter.rooms);
//     console.log('io.sockets.adapter.rooms', io.sockets.adapter.rooms.keys());
//     // console.log('io.sockets.adapter.rooms', io.sockets.adapter.rooms[1]);
//     // socket.emit('rooms', { roomList: io.sockets.adapter.rooms.keys() });
//     console.log(roomList);
//     socket.emit('rooms', roomList);
//   });
// });

http.listen(8080, function () {
  console.log('server Port: 8080');
});
