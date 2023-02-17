import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_ROOMS,
  SOCKET_MESSAGE,
  SOCKET_INIT_MESSAGE_ADD,
  SOCKET_MESSAGE_ADD,
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
          if (baseData.length >= Object.keys(el[payloadRoomId]).length) {
            for (let i = 0; i < baseData.length; i++) {
              if (el[payloadRoomId][i]) {
                // console.log('data 있');
                payloadMsg[i] = el[payloadRoomId][i];
              }
            }
          } else {
            // else 부분은 아직 정확하게 테스트를 못해봤습니다.
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
              content: action.payload.initSocketData.content,
              time: action.payload.defaultMsgTime,
              socketId: action.payload.initSocketData.socketId,
              userId: action.payload.initSocketData.userId,
            },
          },
        },
      ];
      return {
        ...state,
        message: initMessage,
      };
    case SOCKET_ROOM_ADD:
      // 방 추가는 아직 설정 X
      return {
        ...state,
        roomList: state.roomList.concat({
          roomId: action.payload.roomId,
          clientSocketId: action.payload.clientSocketId,
          clientUserId: action.payload.clientUserId,
        }),
      };
    case SOCKET_MESSAGE_ADD:
      console.log('actionPayload', action.payload);
      const roomId = action.payload.roomId;
      const newMessage = action.payload.msg;
      const msgLength = action.payload.messageLength;
      // console.log('roomId', roomId);
      // console.log('newMessage', newMessage);
      // const roomMessages = [state.message[0][roomId], msg2];
      // const roomMsg = state.message[0][roomId];
      // console.log(roomMsg);
      // const roomMessages = [...roomMsg, msg2];
      // const roomMessages = roomMsg.concat({ [roomId]: newMessage });
      // const roomMessages = state.message[0][roomId].concat(newMessage);
      // const roomMessages = [state.message[0][roomId], newMessage];
      // const roomMessages = state.message[0][roomId].push(newMessage);
      // console.log('roomMessages', roomMessages);
      // const updatedRoom = { [roomId]: roomMessages };
      // const updatedMessages = [updatedRoom, ...state.message.slice(1)];

      let tempIndex = '';
      state.message.map((el, index) => {
        if (Object.keys(el)[index] === roomId) {
          tempIndex = index;
        }
      });

      // eslint-disable-next-line no-unused-vars
      // let test;
      // state.message.map((el, index) => {
      //   // console.log('el', el);
      //   // console.log('elIndex', el[roomId]);;
      //   test = el[roomId][msgLength] = newMessage;
      //   // console.log('test', test);
      // });

      return {
        ...state,
        message: [
          ...state.message.slice(0, tempIndex),
          {
            ...state.message[tempIndex],
            [roomId]: {
              ...state.message[tempIndex][roomId],
              [msgLength]: newMessage,
            },
          },
          ...state.message.slice(tempIndex + 1),
        ],
      };
    // ...state.message.slice(0, tempIndex)은 state.message 배열에서
    // 0부터 tempIndex 인덱스까지의 요소를 새로운 배열로 만든 것입니다.
    // 이는 기존 배열의 해당 부분을 변경하지 않고 복사본을 만들기 위한 것입니다.
    // 그리고 이 복사본에 다음 요소들을 추가하고 다시 새로운 배열을 만듭니다.
    // ...state.message[tempIndex] : state.message 배열의 tempIndex 위치에 있는 요소를 복사합니다.
    // [roomId]: {...} : 해당 요소에서 roomId 프로퍼티를 갖는 객체를 새로 생성하여,
    // 그 내부에 있는 msgLength 프로퍼티를 갖는 객체를 newMessage로 설정합니다.
    // ...state.message.slice(tempIndex + 1) : 기존 배열에서 tempIndex 다음부터 마지막까지의 요소를 새로운 배열로 만듭니다.
    // 이러한 방식으로 기존의 state.message 배열을 변경하지 않고, 새로운 배열을 생성하고 그 배열을 반환합니다.
    // 이것은 Redux에서 불변성을 유지하면서 상태를 업데이트하는 일반적인 방법입니다.

    // console.log('action', action.payload);
    // // console.log('asd', Object.keys(state.message[0]));
    // // let arrayMessageKey = Object.keys(state.message[0]);
    // // console.log('arrayNum', arrayMessageKey);
    // // let updateMessage;
    // // for(let i = 0; i < arrayMessageKey.length; i++) {
    // //   if(arrayMessageKey[i] === action.payload.roomId) {
    // //     // updateMessage =
    // //   }
    // // }
    // // state.message.map((el, index) => {
    // //   console.log('el', el['ff8651fa-2303-4b0d-8e6b-a042ef4b07d1']);
    // //   console.log('Object.keys(el)', Object.keys(el));
    // //   console.log('action.payload.socketId', action.payload.roomId);
    // //   if (el === action.payload.socketId) {
    // //     console.log('socket', el);
    // //   }
    // // });
    // console.log(
    //   'state.message[0][action.payload.roomId]',
    //   state.message[0][action.payload.roomId]
    // );
    // const updateMessage = [
    //   ...state.message[0][action.payload.roomId],
    //   action.payload.msg,
    // ];
    // return {
    //   ...state,
    //   message: [...state.message, updateMessage],
    // };
    default:
      return state;
  }
}
