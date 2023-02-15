import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ChatbotManager.css';
import { socketRooms, socketRoomsAdd } from '../actions/socket_action';

export default function ChatbotManager() {
  const [isChattingBox, setIsChattingBox] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const roomList = useSelector((state) => state.socket.roomList);
  // const isLogin = useSelector((state) => state.user.loginSuccess.loginSuccess);

  useEffect(() => {
    console.log('socket', socket);
    // socket.emit('send_message', 'test');
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
    socket.on('updateRooms', (roomData) => {
      console.log(roomData);
      dispatch(socketRoomsAdd(roomData));
    });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* 챗봇 아이콘 */}
      {!isChattingBox && (
        <div className="chatBotIconWrap">
          <button
            type="button"
            className="newAlertBtn"
            onClick={() => setIsChattingBox(!isChattingBox)}
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
      {isChattingBox && (
        <div className="chatRoomWindowWrap">
          <Row>
            {/* 채팅창 닫기 버튼 */}
            <Col xs={12}>
              <div
                className="closeBtn closeBtnRoom"
                onClick={() => setIsChattingBox(!isChattingBox)}
              ></div>
            </Col>
          </Row>

          {/* 채팅방 리스트 */}
          <Row className="chatRoomWindowAreaWrap">
            <Col xs={12}>
              {/* 방 목록 */}

              {/* 방 목록 */}
              {roomList.map((el) => {
                // console.log('el', el);
                return (
                  <Row className="chatRoomList" key={el.roomId}>
                    <Col xs={12} style={{ padding: '0px 5px' }}>
                      <Row>
                        <Col xs={9} style={{ padding: '0px' }}>
                          <span
                            style={{ fontSize: '0.85rem', fontWeight: '700' }}
                          >
                            {/* 아이디 */}
                            {/* 일이삼사오육칠팔구십 */}
                            {el.clientUserId}
                          </span>
                        </Col>
                        <Col
                          xs={3}
                          style={{ padding: '0px', textAlign: 'right' }}
                        >
                          <span style={{ fontSize: '0.7rem' }}>오전 11:30</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={9} style={{ padding: '0px' }}>
                          <pre className="chatRoomListContent">
                            {el.msg}
                            {/* 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. */}
                            {/* 안녕하세요. 안녕하세요. 안녕하세요. */}
                          </pre>
                        </Col>
                        <Col
                          xs={3}
                          style={{ padding: '0px', textAlign: 'right' }}
                        >
                          <span style={{ fontSize: '0.7rem' }}>알람</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
