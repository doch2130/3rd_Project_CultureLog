import {
  SOCKET_INIT,
  SOCKET_ROOMADD,
  SOCKET_ROOMS,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
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

export function socketRoomsAdd(room) {
  return {
    type: SOCKET_ROOM_ADD,
    payload: room,
  };
}

export function socketMessageAdd(msg) {
  return {
    type: SOCKET_INIT_MESSAGE_ADD,
    payload: msg,
  };
}
