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
          time: '',
        },
        {
          permission: 'default',
          content: '문gggggggg',
          time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
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
      // time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    });

    // 관리자 로그인 시 실행해주려고 했는데, 현재 Chatbot 컴포넌트가 따로 돌고 있어서 그런지,
    // 로그인 이후에도 실행이 안되서, 바로 데이터 보내주는 방식으로 변경
    // 단, 로그인 유저가 manager인 경우에만 데이터 볼 수 있게 함
    socketIO.emit('getRooms', rooms);

    // 기본 설정?
    // 수정이 필요할 듯
    // socketIO.emit('updateRooms', tempMessage);

    socket.on('disconnect', () => {
      console.log(socket.id + ' Exit');
      delete data[socket.id];
      // socketIO.emit('userDisconnect', socket.id);
    });
  });
};
