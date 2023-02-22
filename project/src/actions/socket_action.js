import {
  SOCKET_INIT,
  SOCKET_ROOMS,
  SOCKET_MESSAGE,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
  SOCKET_MESSAGE_ADD,
  SOCKET_ROOM_REFRESH,
  SOCKET_LOGIN_UPDATE,
  // SOCKET_LOGOUT,
  SOCKET_ROOM_REFRESH_UPATE,
  SOCKET_PAGE_REFRESH,
} from './types';

export function socketInit(socket) {
  return {
    type: SOCKET_INIT,
    payload: socket,
  };
}

// 테스트
export function socketRoomsRefreshUpdate(roomData) {
  const tempMsg = [];
  for (let i = 0; i < roomData.msg.length; i++) {
    tempMsg.push(roomData.msg[i]);
  }
  return {
    type: SOCKET_ROOM_REFRESH_UPATE,
    payload: { room: roomData, roomMsg: tempMsg },
  };
}

export function socketRooms(rooms) {
  return {
    type: SOCKET_ROOMS,
    payload: rooms,
  };
}

export function socketMessage(roomId, msg) {
  const tempMsg = [];
  for (let i = 0; i < msg.length; i++) {
    tempMsg.push(msg[i]);
  }
  return {
    type: SOCKET_MESSAGE,
    payload: roomId,
    payloadMsg: tempMsg,
  };
}

export function socketInitMessageAdd(msg) {
  return {
    type: SOCKET_INIT_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsAdd(roomData) {
  return {
    type: SOCKET_ROOM_ADD,
    payload: roomData,
  };
}

export function socketMessageAdd(msg) {
  return {
    type: SOCKET_MESSAGE_ADD,
    payload: msg,
  };
}

// 필요 없을 것 같음 (보류)
// export function socketLogout(dieSocketId) {
//   return {
//     type: SOCKET_LOGOUT,
//     payload: dieSocketId,
//   };
// }

export function socketRoomsRefresh() {
  return {
    type: SOCKET_ROOM_REFRESH,
  };
}

export function socketUserLogin(roomData, userData) {
  // console.log('roomData action', roomData);
  // console.log('userData action', userData);
  return {
    type: SOCKET_LOGIN_UPDATE,
    payload: { roomData, userData },
  };
}

export function socketPageRefresh(roomData, userData) {
  // console.log('asdasdasdasdssa');
  console.log('roomData', roomData);
  console.log('userData', userData);
  return {
    type: SOCKET_PAGE_REFRESH,
    payload: { roomData, userData },
  };
}
