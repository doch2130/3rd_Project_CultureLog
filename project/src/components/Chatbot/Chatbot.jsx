import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  socketRoomsAdd,
  socketInitMessageAdd,
  socketRoomsRefresh,
  socketMessageAdd,
  socketUserLogin,
  socketRoomsRefreshUpdate,
} from '../../actions/socket_action';
import ChatbotManager from './ChatbotManager';
import ChatbotRoom from './ChatbotRoom';
import './Chatbot.css';
import axios from 'axios';
import axiosurl from '../../axiosurl';

export default function Chatbot() {
  const date = new Date();
  const dispatch = useDispatch();
  const [isChatBotIcon, setIsChatBotIcon] = useState(true);
  const [isChatAlarm, setIsChatAlarm] = useState(false);

  const userInfo = useSelector((state) => state.user.loginSuccess);
  const socket = useSelector((state) => state.socket.socket);
  const roomList = useSelector((state) => state.socket.roomList);
  const message = useSelector((state) => state.socket.message);

  const [mySocketId, setMySocketId] = useState('');
  const [myRoomId, setMyRoomId] = useState('');
  const [roomMessageCount, setRoomMessageCount] = useState([]);
  const [totalRoomMessageCount, setTotalRoomMessageCount] = useState([]);

  const messageRoomDefaultData = {
    0: {
      permission: 'server',
      content: 'Error Prevention',
      time: '2023. 1. 01. 00:00:00',
      socketId: '00000000000000000000',
      userId: '',
    },
  };

  const messageRoom = message[0] ? message[0] : messageRoomDefaultData;

  useEffect(() => {
    socket.on('welcome', (initSocketData) => {
      // console.log('initSocketData', initSocketData);
      // console.log('userInfo', userInfo);
      dispatch(socketInitMessageAdd({ initSocketData }));
      dispatch(
        socketRoomsAdd({
          roomId: initSocketData.roomId,
          clientSocketId: initSocketData.socketId,
          clientUserId: initSocketData.userId,
        })
      );

      setMySocketId(initSocketData.socketId);
      setMyRoomId(initSocketData.roomId);
    });

    socket.on('getRooms', (roomsData) => {
      // 따로 설정을 안해도 socketInitMessageAdd() 함수가 먼저 실행이 되지만,
      // 혹시 모를 안전을 위해서 1초 후 실행되도록 설정
      // console.log('roomsData', roomsData);
      for (let i = 0; i < roomsData.length; i++) {
        // console.log('roomsData[i].msg', roomsData[i].msg);
        dispatch(socketRoomsRefreshUpdate(roomsData[i]));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메시지 받기
  useEffect(() => {
    function messageRecive(data) {
      // 방 존재 여부 체크용 변수
      let isExistRoom = false;
      // 방 있는지 검사
      // map 함수에서 forEach 함수로 변경
      // map에서는 위의 코드에서는 return문이 필요한데 굳이 필요가 없다고 함
      roomList.forEach((el) => {
        // 방이 있으면, 메시지 전송 함수 실행 (일반, 관리자)
        if (el.roomId === data.roomId) {
          const messageTempData = {
            permission: data.permission,
            content: data.content,
            time: data.time,
            socketId: data.socketId,
            userId: data.userId,
            // roomId: data.roomId,
          };
          // const messageLength = Object.keys(messageRoom[myRoomId]).length;
          const messageLength = Object.keys(messageRoom[data.roomId]).length;
          // console.log('messageLength', messageLength);
          const newMessage = {
            roomId: data.roomId,
            messageLength: messageLength,
            msg: messageTempData,
          };
          isExistRoom = true;
          return dispatch(socketMessageAdd(newMessage));
        }
      });
      // forEacth 함수에서 방이 있으면 True, 없으면 False
      // False인 경우 실행
      if (!isExistRoom) {
        // 방이 없는 경우 관리자인 경우만 실행
        if (userInfo.permission === 'manager') {
          // 방 추가 작업 진행
          const tempRoomData = {
            roomId: data.roomId,
            clientSocketId: data.socketId,
            clientUserId: data.userId,
          };
          dispatch(socketRoomsAdd(tempRoomData));
          const messageTempData = {
            permission: data.permission,
            content: data.content,
            time: data.time,
            socketId: data.socketId,
            userId: data.userId,
          };

          // 방이 없으면 기본 length는 0을 가지게 되므로 0 고정 값 설정
          const messageLength = 0;
          const newMessage = {
            roomId: data.roomId,
            messageLength: messageLength,
            msg: messageTempData,
          };
          dispatch(socketMessageAdd(newMessage));
        }
      }
    }

    // 메시지 받기
    socket.on('receiveMessage', messageRecive);

    // 메시지 받을 때 알람 체크 변수 상태 변경
    if (isChatBotIcon) {
      setIsChatAlarm(true);
    }

    // 이거를 작성해줘야 중복 실행이 되지 않는다.
    return () => {
      socket.off('receiveMessage', messageRecive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messageRoom, myRoomId, dispatch, userInfo, roomList]);

  // 사용자 로그인 시 정보 업데이트
  useEffect(() => {
    socket.on('userLoginUpdate', (roomData, userData) => {
      // console.log('userLoginUpdate userData', userData);
      // console.log('userLoginUpdate roomData', roomData);
      dispatch(socketUserLogin(roomData, userData));
    });
  }, [dispatch, socket]);

  // 사용자 나갔을 때 메시지 출력, 관리자만 출력
  useEffect(() => {
    function userDisconnect(data) {
      if (userInfo.permission === 'manager') {
        roomList.forEach((el) => {
          // 방이 있으면, 메시지 전송 함수 실행 (관리자)
          if (el.roomId === data.roomId) {
            const messageTempData = {
              permission: data.permission,
              content: data.content,
              time: data.time,
              socketId: data.socketId,
              userId: data.userId,
              // roomId: data.roomId,
            };
            // const messageLength = Object.keys(messageRoom[myRoomId]).length;
            const messageLength = Object.keys(messageRoom[data.roomId]).length;
            // console.log('messageLength', messageLength);
            const newMessage = {
              roomId: data.roomId,
              messageLength: messageLength,
              msg: messageTempData,
            };
            return dispatch(socketMessageAdd(newMessage));
          }
        });
      }
    }

    socket.on('userDisconnect', userDisconnect);

    // 이거를 작성해줘야 중복 실행이 되지 않는다.
    return () => {
      socket.off('userDisconnect', userDisconnect);
    };
  }, [dispatch, messageRoom, roomList, socket, userInfo.permission]);

  // 관리자 - 방 - 새로고침 (DB정보 불러오기)
  const roomRefrsh = () => {
    const chooseMsg = window.confirm('새로고침으로 방 목록을 갱신하겠습니까?');
    if (chooseMsg) {
      socket.emit('getRoomsList', myRoomId);
      dispatch(socketRoomsRefresh());
      alert('방 목록을 갱신하였습니다.');
    }
  };

  // useEffect(() => {
  //   // 관리자 전용 방 알림 (처음 실행 시 기본 값 설정)
  //   if (userInfo.permission === 'manager') {
  //     // console.log('myRoomId', myRoomId);
  //     // console.log('mySocketId', mySocketId);
  //     // console.log('roomList', roomList);
  //     // console.log('message[0]', message[0]);
  //     // console.log('object.key', Object.keys(message[0]));
  //     // console.log('user', userInfo);

  //     const messageRoomList = message[0] ? Object.keys(message[0]) : '';
  //     // console.log('messageRoomList', messageRoomList);
  //     let tempMessageCount = [];
  //     for (let i = 0; i < messageRoomList.length; i++) {
  //       const data = {
  //         roomId: messageRoomList[i],
  //         userId: userInfo.email,
  //         checkMessageCount: 0,
  //         // 기본 값은 0이지만, 서버 메시지 1개가 있어서 1로 변경 후 설정해봄
  //         // checkMessageCount: 1,
  //       };
  //       tempMessageCount.push(data);
  //     }
  //     console.log('temp', tempMessageCount);
  //     setRoomMessageCount(tempMessageCount);

  //     if (tempMessageCount) {
  //       // console.log('axios userInfo', userInfo);
  //       console.log('roomMessageCount', roomMessageCount);
  //       axios({
  //         method: 'get',
  //         url: axiosurl.chatMessageAlarm,
  //         // data: {
  //         //   user: userInfo.email,
  //         //   roomIdList: tempMessageCount
  //         // },
  //         // data: roomMessageCount,
  //         params: tempMessageCount,
  //       }).then((response) => {
  //         console.log('response', response);
  //         // setTotalRoomMessageCount();
  //       });
  //     }
  //     // console.log('message 0', Object.keys(message[0])[0]);
  //     // console.log('message length', messageRoomList[0].length);
  //     // console.log('message length', Object.keys(messageRoomList[0]));
  //     // console.log('asdasd', message[0][messageRoomList[0]]);
  //     // 메시지 개수 구하는 방법
  //     // console.log('asdasd', Object.keys(message[0][messageRoomList[0]]).length);
  //   }
  // }, [message, userInfo]);

  return (
    <div>
      {/* 챗봇 아이콘 */}
      {isChatBotIcon && (
        <div className="chatBotIconWrap">
          <button
            type="button"
            className="newAlertBtn"
            onClick={() => setIsChatBotIcon(!isChatBotIcon)}
          >
            <img
              src="/chatBotIcon.png"
              alt="chatBotIcon"
              className="chatBotIcon"
            />
            {/* 챗봇아이콘 True & 알람 True 일때 출력 */}
            {isChatBotIcon ? (
              isChatAlarm && <span className="newAlertSpan"></span>
            ) : (
              <span></span>
            )}
          </button>
        </div>
      )}
      {/* 채팅창 시작 */}
      {!isChatBotIcon && (
        <div className="chatWindowWrap">
          <Row>
            {/* 채팅창 닫기 버튼 */}
            <Col xs={12}>
              {userInfo.permission === 'manager' && (
                <div
                  style={{ display: 'inline-block', cursor: 'pointer' }}
                  onClick={() => {
                    roomRefrsh();
                  }}
                >
                  <img
                    src="/refreshImg.png"
                    alt="refreshImg"
                    style={{
                      width: '15px',
                      height: '15px',
                      marginRight: '5px',
                      marginBottom: '3px',
                    }}
                  />
                </div>
              )}
              <div
                className="closeBtn"
                onClick={() => {
                  setIsChatBotIcon(!isChatBotIcon);
                  setIsChatAlarm(false);
                }}
              ></div>
            </Col>
          </Row>

          {/* 관리자 or 일반 사용자 */}
          {userInfo.permission === 'manager' ? (
            <ChatbotManager
              mySocketId={mySocketId}
              myRoomId={myRoomId}
              userInfo={userInfo}
            />
          ) : (
            <ChatbotRoom
              mySocketId={mySocketId}
              myRoomId={myRoomId}
              userInfo={userInfo}
              message={message}
            />
          )}
        </div>
      )}
    </div>
  );
}
