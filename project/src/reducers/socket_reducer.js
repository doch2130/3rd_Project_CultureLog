import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_ROOMS,
  SOCKET_INIT_MESSAGE_ADD,
} from '../actions/types';

const initState = {
  roomList: [],
  message: [],
};

export default function socket_reducer(state = initState, action) {
  switch (action.type) {
    case SOCKET_INIT:
      return { ...state, socket: action.payload };
    case SOCKET_ROOMS:
      console.log(action.payload.msg);

      // if (action.payload.msg.length > 0) {
      //   for (let i = action.payload.msg.length; i > 0; i++) {
      //     action.payload.msg[i] = action.payload.msg[i - 1];
      //   }
      //   action.payload.msg[0] = {};
      // }

      const newMessage = {
        ...state.message,
        [action.payload.roomId]: [
          // ...(state.message[action.payload.roomId] || []),
          {
            msg: action.payload.msg,
            // msg: {
            //   permission: action.payload.msg.permission,
            //   time: action.payload.msg.time,
            //   content: action.payload.msg.content,
            // },
          },
        ],
      };
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
        }),
        message: newMessage,
      };
    case SOCKET_ROOM_ADD:
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
          msg: action.payload.msg,
        }),
      };
    // case SOCKET_INIT_MESSAGE_ADD:
    //   const initMessage = {
    //     ...state.message,
    //     [action.payload.initSocketData.roomId]: [
    //       // ...(state.message[action.payload.initSocketData.roomId] || []),
    //       {
    //         msg: {
    //           0: {
    //             permission: action.payload.initSocketData.permission,
    //             time: action.payload.defaultMsgTime,
    //             content: action.payload.initSocketData.content,
    //           },
    //         },
    //       },
    //     ],
    //   };
    //   return {
    //     ...state,
    //     message: initMessage,
    //   };
    default:
      return state;
  }
}
