import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { socketRooms, socketRoomsAdd } from '../../actions/socket_action';
import ChatbotManager from './ChatbotManager';
import ChatbotRoom from './ChatbotRoom';
import './Chatbot.css';

export default function Chatbot() {
  const dispatch = useDispatch();
  const [isChatBotIcon, setIsChatBotIcon] = useState(true);

  const userPermission = useSelector((state) => state.user.loginSuccess);
  // const userPermission = useSelector(
  //   (state) => state.user.loginSuccess.permission
  // );
  const socket = useSelector((state) => state.socket.socket);

  useEffect(() => {
    socket.on('welceome', (msg) => {
      console.log(msg);
    });

    // 현재 방 목록 받아오기
    socket.on('getRooms', (roomsData) => {
      // console.log('getRooms', data);
      for (let i = 0; i < roomsData.length; i++) {
        dispatch(socketRooms(roomsData[i]));
      }
    });

    // console.log(roomList.length);
    // if (roomList.length > 0) {
    // 그냥 두었더니 방 목록 + 새로운 방 업데이트 둘다 실행되서 조건문을 걸어야 할 것 같다.
    // 사용자 새로 접속 시 이벤트 발생
    // socket.on('updateRooms', (roomData) => {
    //   console.log(roomData);
    //   dispatch(socketRoomsAdd(roomData));
    // });
  });
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
          {/* {userPermission === 'default' ? <ChatbotManager /> : <ChatbotRoom />} */}
          {userPermission.userId === '63ecad322ba25214448d088d' ? (
            <ChatbotManager />
          ) : (
            <ChatbotRoom />
          )}
        </div>
      )}
    </div>
  );
}
