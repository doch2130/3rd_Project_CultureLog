import { SOCKET_INIT, SOCKET_ROOMADD, SOCKET_ROOMS } from './types';

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
    type: SOCKET_ROOMADD,
    payload: room,
  };
}
