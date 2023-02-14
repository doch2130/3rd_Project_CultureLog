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

// DB
// const userList = {};
// const manager = {};
// const message = {}; ??? 이거는 조금 고민 필요 uuid를 키값으로 바로 사용하면 굳이 없어도 된다.
const data = {};
let userId = '';
// 1. 사용자
// 사이트 접속
io.on('connection', (socket) => {
  // socket.id  자동 발급
  // uuid.v4 발급
  const roomUid = uuid.v4();

  // 본인 방에 강제 입장 시키기
  socket.join(roomUid);

  // 처음 메시지 출력
  io.to(roomUid).emit('welcome', '문의 사항이 있으시면 메시지 남겨주세요.');

  // 처음 페이지 접속 => userID 없음,  로그인 안하고 문의 시 => userID 없음
  // userID 대신 uuid 값 저장 / (방 이랑 동일, 중복 값 피하기 위하여 UUID 사용)

  // if문으로 설정하면, 처음 연결에는 UID 값이 들어가지만,
  // 이후 연결자는 userId에 값이 있는 것으로 인식해서 새로운 정보 반영이 안된다.
  // 그래서 일단 기본 값으로 roomUid를 설정하고, 로그인 하면 정보를 업데이트 하는 방식으로 변경하면 될 것 같다.
  // if (userId === undefined || userId === '') {
  // if(socket.id['userId'])
  userId = roomUid;
  // }
  // console.log("socket.id['userId']", socket.id['userId']);

  // 사용자 기본 데이터 저장
  const tempData = {
    userId: userId,
    roomId: roomUid,
    permissions: 'default',
    msg: '',
  };

  // 사용자 기본 데이터를 DB에 저장 (Redis 사용 할 예정)
  data[socket.id] = tempData;
  console.log('data', data);
  // console.log('data json', JSON.stringify(data['socketId']));
  // console.log('data json', JSON.stringify(data, null, 2));

  // 데이터 저장 방식
  // redisCli.set(socket.id, JSON.stringify(data[socket.id]));
  // redisCli.set(socket.id, JSON.stringify(tempData));

  socket.on('disconnect', () => {
    console.log(data[socket.id].roomId);
    delete data[socket.id];
  });
});

// // emit을 할때 객체는 전달 할 수 없다고 한다.
// // json 형식이나 일반 데이터만 전달 가능
// // 함수가 있는 경우에는 Null로 표기된다고 한다.
// const roomList = {};

// io.on('connection', (socket) => {
//   //연결이 들어오면 실행되는 이벤트
//   // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.

//   console.log('uuid', uuid.v4());

//   roomList[socket.id] = socket.id;
//   console.log(roomList);

//   //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
//   // socket.emit('usercount', io.engine.clientsCount);
//   // io로 바꾸면 다른 사람들도 인원이 업데이트가 된다.
//   io.emit('usercount', io.engine.clientsCount);

//   // 관리자 socketID 넣어서 connection 생길때마다 추가해주기
//   // 나중에는 사용자가 message보내면 추가하는 방식으로 변경
//   // socket.to('관리자socketID').emit('rooms', roomList);

//   // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
//   // socket.on('message', (msg) => {
//   socket.on('message', (msg, roomname) => {
//     //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
//     console.log('Message received: ' + msg);

//     // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
//     // io.emit('message', msg);
//     // io.to(socket.id).emit('message', msg);
//     // io.to(방이름).emit으로 특정 방의 소켓들에게 신호를 보낼 수 있다.
//     io.to(roomname).emit('message', msg);
//   });

//   //기본적으로 채팅방 하나에 접속시켜준다.
//   // 기본
//   // socket.join(socket.id);
//   // 변경
//   // const roomName = 'room' + roomList.length;
//   const roomName = 'room1';
//   // socket.join(roomName);
//   socket.join(socket.id);

//   socket.emit('info', socket.id);

//   socket.on('getRooms', () => {
//     console.log('socket.id', socket.id);
//     // console.log(JSON.stringify(roomList));
//     // socket.emit('rooms', 'test');
//     // socket.emit('rooms', JSON.stringify(roomList));

//     // io.sockets.adapter.rooms rooms 리스트를 가져오는 함수이지만, emit으로는 전달이 안된다.
//     // 버전에 따라서 되는 경우도 있는 것 같다.
//     socket.emit('rooms', roomList);
//     // socket.emit('rooms', io.sockets.adapter.rooms);
//   });

//   // 룸 전환 신호
//   socket.on('joinRoom', (roomname, roomToJoin) => {
//     socket.leave(roomname); // 기존의 룸을 나가고
//     socket.join(roomToJoin); // 들어갈 룸에 들어간다.

//     // 룸을 성공적으로 전환했다는 신호 발송
//     socket.emit('roomChanged', roomToJoin);
//   });
// });

http.listen(8080, function () {
  console.log('server Port: 8080');
});
