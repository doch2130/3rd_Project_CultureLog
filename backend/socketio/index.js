const uuid = require('uuid');

// 소켓 임시 저장 변수
const data = {};
const message = [];
const rooms = [];
// const roomList = {};
let userId = '';
let managerSocketId = '';

// 메시지 시간 저장 변수
const date = new Date();

module.exports = (socketIO) => {
  // 여기서는 io.on, io.emit 대신에 socketIO.on 으로 사용하면 된다.
  socketIO.on('connection', (socket) => {
    // socket.id 자동 발급
    // uuid.v4 수동 발급
    const roomUid = uuid.v4();

    // 본인 방에 강제 입장 시키기
    socket.join(roomUid);

    // 기본 userId 값은 roomUid와 동일하게 설정
    userId = roomUid;

    // 사용자 기본 데이터 저장 (일반 유저: default, 관리자: manager)
    // 관리자 권한은 수동 작업으로 변경
    const tempData = {
      userId: userId,
      roomid: roomUid,
      permissions: 'default',
      // msg: `test 메시지 입니다.test 메시지 입니다.test 메시지 입니다.
      // test 메시지 입니다.test 메시지 입니다.test 메시지 입니다.`,
    };

    // 사용자 기본 데이터를 DB에 저장
    data[socket.id] = tempData;
    // console.log('data', data);
    // console.log('data json', JSON.stringify(data['socketId']));
    // console.log('data json', JSON.stringify(data, null, 2));

    // 데이터 저장 방식
    // redisCli.set(socket.id, JSON.stringify(data[socket.id]));
    // redisCli.set(socket.id, JSON.stringify(tempData));

    // 방 리스트 임시 저장
    const tempRoom = {
      roomId: roomUid,
      clientSocketId: socket.id,
      clientUserId: userId,
      msg: [
        {
          permission: 'server',
          content: '문의 사항이 있으시면 메시지 남겨주세요.',
          time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
          socketId: 'e9f1',
          userId: 'pasd123',
        },
        {
          permission: 'default',
          content: '문gggggggg',
          time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
          socketId: 'j2ygf8',
          userId: 'zxcv123',
        },
      ],
    };

    // 방 리스트 저장
    rooms.push(tempRoom);

    // 기본 메시지
    // socketIO
    //   .to(roomUid)
    //   .emit('welceome', '문의 사항이 있으시면 메시지 남겨주세요.' + roomUid);

    // 기본 메시지 + 사용자 방ID, 소켓ID
    socket.emit('welceome', {
      roomId: roomUid,
      socketId: socket.id,
      permission: 'server',
      content: '문의 사항이 있으시면 메시지 남겨주세요.',
      time: '',
      userId: '',
      // time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    });

    // 관리자 로그인 시 실행해주려고 했는데, 현재 Chatbot 컴포넌트가 따로 돌고 있어서 그런지,
    // 로그인 이후에도 실행이 안되서, 바로 데이터 보내주는 방식으로 변경
    // 단, 로그인 유저가 manager인 경우에만 데이터 볼 수 있게 함
    // socketIO.emit('getRooms', rooms);
    // 자동 뿌리기 말고, 요청시로 변경
    socket.on('getRoomsList', (myRoomId) => {
      // console.log('rooms', rooms);
      for (let i = 0; i < rooms.length; i++) {
        if (myRoomId === rooms[i].roomId) continue;
        socket.join(rooms[i].roomId);
      }
      socket.emit('getRooms', rooms);
    });

    // 기본 설정?
    // 수정이 필요할 듯
    // socketIO.emit('updateRooms', tempMessage);

    socket.on('message', (data) => {
      console.log('message', data);
      // io, socket 둘다 메시지가 보이기는 함
      // 관리자랑 연결 후에 따라 사용 방법이 다를듯
      // socketIO.to(data.roomId).emit('receiveMessage', {
      socketIO.emit('receiveMessage', {
        // socket.emit('receiveMessage', {
        content: data.content,
        socketId: data.socketId,
        permission: data.permission,
        userId: data.userId,
        time: data.time,
        roomId: data.roomId,
      });
    });

    // 사용자 로그인 시 정보 업데이트
    socket.on('userLogin', (roomData, userData) => {
      console.log('userLogin userData', userData);
      console.log('userLogin roomData', roomData);
      socketIO.emit('userLoginUpdate', roomData, userData);
    });

    // 사용자 연결 종료
    socket.on('disconnect', () => {
      console.log(socket.id + ' Exit');

      socketIO.emit('userDisconnect', {
        content: '사용자가 접속을 종료하였습니다.',
        socketId: socket.id,
        permission: 'server',
        userId: '',
        time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
        roomId: roomUid,
      });

      delete data[socket.id];
    });
  });
};
