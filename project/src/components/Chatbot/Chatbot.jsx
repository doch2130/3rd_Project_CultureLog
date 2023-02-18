import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  socketRooms,
  socketRoomsAdd,
  socketInitMessageAdd,
  socketMessage,
  socketRoomsRefresh,
  socketMessageAdd,
} from '../../actions/socket_action';
import ChatbotManager from './ChatbotManager';
import ChatbotRoom from './ChatbotRoom';
import './Chatbot.css';

export default function Chatbot() {
  const date = new Date();
  const dispatch = useDispatch();
  const [isChatBotIcon, setIsChatBotIcon] = useState(true);

  const userInfo = useSelector((state) => state.user.loginSuccess);
  const socket = useSelector((state) => state.socket.socket);
  const roomList = useSelector((state) => state.socket.roomList);
  const message = useSelector((state) => state.socket.message);

  const [mySocketId, setMySocketId] = useState('');
  const [myRoomId, setMyRoomId] = useState('');

  const messageRoomDefaultData = {
    0: {
      permission: 'server',
      content: 'Error Prevention',
      time: '2023. 1. 01. 00:00:00',
      socketId: '00000000000000000000',
      userId: '',
    },
  };
  // const messageRoom = message[0][myRoomId]
  //   ? message[0][myRoomId]
  //   : messageRoomDefaultData;

  const messageRoom = message[0] ? message[0] : messageRoomDefaultData;

  useEffect(() => {
    socket.on('welceome', (initSocketData) => {
      // console.log(initSocketData);
      const defaultMsgTime =
        date.toLocaleDateString() + ' ' + date.toString().slice(16, 24);
      dispatch(socketInitMessageAdd({ initSocketData, defaultMsgTime }));
      setMySocketId(initSocketData.socketId);
      setMyRoomId(initSocketData.roomId);
    });

    socket.on('getRooms', (roomsData) => {
      // 따로 설정을 안해도 socketInitMessageAdd() 함수가 먼저 실행이 되지만,
      // 혹시 모를 안전을 위해서 1초 후 실행되도록 설정

      setTimeout(() => {
        // console.log('getRooms', roomsData);
        for (let i = 0; i < roomsData.length; i++) {
          // console.log('oomsData[i].msg', roomsData[i].msg);
          dispatch(socketRooms(roomsData[i]));
        }

        for (let i = 0; i < roomsData.length; i++) {
          // console.log('oomsData[i].msg', roomsData[i].msg);
          dispatch(socketMessage(roomsData[i].roomId, roomsData[i].msg));
        }
      }, 1000);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메시지 받기 - 이사 중
  useEffect(() => {
    function messageRecive(data) {
      // console.log(data);
      // if (data.socketId === mySocketId) {
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
        // roomId: myRoomId,
        // roomId: roomId,
        messageLength: messageLength,
        msg: messageTempData,
      };
      dispatch(socketMessageAdd(newMessage));
    }

    socket.on('receiveMessage', messageRecive);
    // const chatWindowAreaScroll = document.getElementById(
    //   'chatWindowAreaScroll'
    // );
    // // 메시지 받을 때 스크롤 이동
    // setTimeout(() => {
    //   chatWindowAreaScroll.scrollTop = chatWindowAreaScroll.scrollHeight + 39;
    // }, 5);

    return () => {
      socket.off('receiveMessage', messageRecive);
    };
  }, [socket, messageRoom, myRoomId, dispatch, userInfo]);

  const roomRefrsh = () => {
    socket.emit('getRoomsList', myRoomId);
    dispatch(socketRoomsRefresh());
    alert('새로고침');
  };

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
            <span className="newAlertSpan"></span>
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
                onClick={() => setIsChatBotIcon(!isChatBotIcon)}
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
