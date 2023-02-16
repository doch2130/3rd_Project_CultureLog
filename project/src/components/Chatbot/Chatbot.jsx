import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  socketRooms,
  socketRoomsAdd,
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
  const message = useSelector((state) => state.socket.message);

  const [mySocketId, setMySocketId] = useState('');
  const [myRoomId, setMyRoomId] = useState('');

  useEffect(() => {
    socket.on('welceome', (initSocketData) => {
      // console.log(initSocketData);
      const defaultMsgTime =
        date.toLocaleDateString() + ' ' + date.toString().slice(16, 24);
      // dispatch(socketMessageAdd({ initSocketData, defaultMsgTime }));
      setMySocketId(initSocketData.socketId);
      setMyRoomId(initSocketData.roomId);
    });

    socket.on('getRooms', (roomsData) => {
      // console.log('getRooms', roomsData);
      for (let i = 0; i < roomsData.length; i++) {
        dispatch(socketRooms(roomsData[i]));
      }
    });

    // let temp = [];
    // temp.push({
    //   roomId: userSocketInfo.roomId,
    //   msg: [
    //     {
    //       permission: 'server',
    //       content: '문의 사항이 있으시면 메시지 남겨주세요.',
    //       time:
    //         date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    //     },
    //   ],
    // });

    // console.log(temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div
                className="closeBtn"
                onClick={() => setIsChatBotIcon(!isChatBotIcon)}
              ></div>
            </Col>
          </Row>

          {/* 관리자 or 일반 사용자 */}
          {userInfo.permission === 'manager' ? (
            <ChatbotManager />
          ) : (
            <ChatbotRoom />
          )}
        </div>
      )}
    </div>
  );
}
