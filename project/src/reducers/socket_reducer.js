import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_ROOMS,
  SOCKET_MESSAGE,
  SOCKET_INIT_MESSAGE_ADD,
  // SOCKET_LOGOUT,
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
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
        }),
      };
    case SOCKET_MESSAGE:
      const payloadRoomId = action.payload;
      const payloadMsg = action.payloadMsg;
      // console.log('Array.isArray(state.message)', Array.isArray(state.message));
      // console.log('state.message', state.message);
      // console.log('payloadRoomId', payloadRoomId);
      const updatedMessage = state.message.map((el) => {
        if (el[payloadRoomId] != null) {
          // payloadMsg 개체의 데이터를 메시지 개체의 기존 데이터와 병합
          let baseData = Object.keys(payloadMsg);
          // const roomId = Object.keys(el[payloadRoomId])[0];
          // console.log('roomId', roomId);
          // console.log('el[payloadRoomId]', el[payloadRoomId]);
          // console.log(
          //   'Object.keys(el[payloadRoomId])',
          //   Object.keys(el[payloadRoomId])
          // );
          // console.log(
          //   'Object.keys(el[payloadRoomId])',
          //   Object.keys(el[payloadRoomId]).length
          // );
          // console.log('el[payloadRoomId][roomId]', el[payloadRoomId][roomId]);
          // console.log('payloadMsg', payloadMsg);
          // console.log(' Object.keys(payloadMsg)', Object.keys(payloadMsg));
          // console.log('baseData', baseData);
          // console.log('el[payloadRoomId][roomId]', el[payloadRoomId][roomId]);
          // console.log(
          //   'el[payloadRoomId][roomId]??',
          //   el[payloadRoomId][roomId].length
          // );
          // console.log('baseData.length', baseData.length);
          // console.log(
          //   'el[payloadRoomId][roomId]',
          //   Object.keys(el[payloadRoomId]).length
          // );
          // console.log('payloadMsg', payloadMsg);

          if (baseData.length >= Object.keys(el[payloadRoomId]).length) {
            for (let i = 0; i < baseData.length; i++) {
              if (el[payloadRoomId][i]) {
                // console.log('data 있');
                payloadMsg[i] = el[payloadRoomId][i];
              }
            }
          } else {
            // 이거는 지금 데이터가 없어서 정확하게 확인할 수 있는 방법이 없다.
            for (let i = 0; i < Object.keys(el[payloadRoomId]).length; i++) {
              if (el[payloadRoomId][i]) {
                console.log('data 있2');
                payloadMsg[i] = el[payloadRoomId][i];
              }
            }
          }
          return {
            ...el,
            [payloadRoomId]: {
              ...payloadMsg,
            },
          };
        } else {
          const newRoomId = Object.keys(action.payloadMsg)[0];
          return {
            ...el,
            [payloadRoomId]: {
              [newRoomId]: action.payloadMsg[newRoomId],
            },
          };
        }
      });

      return {
        ...state,
        message: updatedMessage,
      };
    case SOCKET_INIT_MESSAGE_ADD:
      const initMessage = [
        {
          ...state.message,
          [action.payload.initSocketData.roomId]: {
            0: {
              permission: action.payload.initSocketData.permission,
              time: action.payload.defaultMsgTime,
              content: action.payload.initSocketData.content,
            },
          },
        },
      ];
      return {
        ...state,
        message: initMessage,
      };
    case SOCKET_ROOM_ADD:
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
        }),
      };
    default:
      return state;
  }
}
