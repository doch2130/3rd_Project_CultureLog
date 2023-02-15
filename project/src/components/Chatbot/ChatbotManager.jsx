import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ChatbotManager.css';

export default function ChatbotManager2() {
  const roomList = useSelector((state) => state.socket.roomList);
  return (
    <>
      {/* 채팅방 리스트 */}
      <Row className="chatRoomWindowAreaWrap">
        <Col xs={12}>
          {/* 방 목록 */}

          {/* 방 목록 */}
          {roomList.map((el) => {
            // console.log('el', el);
            return (
              <Row className="chatRoomList" key={el.roomId}>
                <Col
                  xs={12}
                  style={{ padding: '2px 5px', backgroundColor: 'white' }}
                >
                  <Row>
                    <Col
                      xs={9}
                      style={{ padding: '0px', backgroundColor: 'white' }}
                    >
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          backgroundColor: 'white',
                        }}
                      >
                        {/* 아이디 */}
                        {/* 일이삼사오육칠팔구십 */}
                        {el.clientUserId.slice(0, 7)}
                      </span>
                    </Col>
                    <Col
                      xs={3}
                      style={{
                        padding: '0px',
                        textAlign: 'right',
                        backgroundColor: 'white',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: 'white',
                          fontWeight: '400',
                        }}
                      >
                        오전 11:30
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={9}
                      style={{ padding: '0px', backgroundColor: 'white' }}
                    >
                      <pre className="chatRoomListContent">
                        {el.msg}
                        {/* 안녕하세요. 안녕하세요. */}
                      </pre>
                    </Col>
                    <Col
                      xs={3}
                      style={{
                        padding: '0px',
                        textAlign: 'right',
                        backgroundColor: 'white',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: 'white',
                          fontWeight: '400',
                        }}
                      >
                        알람
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </>
  );
}
