import {
  SOCKET_INIT,
  SOCKET_ROOMS,
  SOCKET_MESSAGE,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
  // SOCKET_LOGOUT,
} from './types';

export function socketInit(socket) {
  return {
    type: SOCKET_INIT,
    payload: socket,
  };
}

export function socketRooms(rooms) {
  return {
    type: SOCKET_ROOMS,
    payload: rooms,
  };
}

export function socketMessage(roomId, msg) {
  // console.log('action roomId', roomId);
  // console.log('action msg', msg[0]);
  const tempMsg = [];
  for (let i = 0; i < msg.length; i++) {
    tempMsg.push(msg[i]);
  }
  // console.log('Array.isArray(tempMsg)', Array.isArray(tempMsg));
  // console.log('tempMsg', tempMsg);
  return {
    type: SOCKET_MESSAGE,
    payload: roomId,
    payloadMsg: tempMsg,
  };
}

export function socketMessageAdd(msg) {
  return {
    type: SOCKET_INIT_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsAdd(room) {
  return {
    type: SOCKET_ROOM_ADD,
    payload: room,
  };
}

// 필요 없을 것 같다.
// export function socketLogout(dieSocketId) {
//   return {
//     type: SOCKET_LOGOUT,
//     payload: dieSocketId,
//   };
// }
