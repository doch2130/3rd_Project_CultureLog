import { SOCKET_INIT, SOCKET_ROOMADD, SOCKET_ROOMS } from '../actions/types';
// const roomList = [];
const initState = {
  roomList: [],
};

export default function socket_reducer(state = initState, action) {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, socket: action.payload };
    case SOCKET_ROOMS:
      // console.log(typeof action.payload.roomId);
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
          msg: action.payload.msg,
        }),
      };
    case SOCKET_ROOMADD:
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
          msg: action.payload.msg,
        }),
      };
    default:
      return state;
  }
}
