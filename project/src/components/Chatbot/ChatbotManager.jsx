import React, { useState } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ChatbotManager.css';
import ChatbotRoom from './ChatbotRoom';

export default function ChatbotManager() {
  const roomList = useSelector((state) => state.socket.roomList);
  const message = useSelector((state) => state.socket.message);
  // const roomId = useSelector((state) => state.socket.roomList);
  const [selectRoom, setSelectRoom] = useState(null);
  const handleClose = () => setSelectRoom(null);
  console.log(roomList);

  return (
    <>
      <Offcanvas
        show={selectRoom !== null}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <ChatbotRoom />
        </Offcanvas.Body>
      </Offcanvas>

      {/* 채팅방 리스트 */}
      <Row className="chatRoomWindowAreaWrap">
        <Col xs={12}>
          {/* 방 목록 */}
          {roomList.map((el) => {
            // console.log('el', el);
            return (
              <Row
                className="chatRoomList"
                key={el.roomId}
                onClick={() => setSelectRoom(el)}
              >
                <Col xs={12}>
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
                        {/* 마지막 대화 내용 가져오기 */}
                        {message.map((elMsg) => {
                          let content = '';
                          if (el.roomId === elMsg.roomId) {
                            content = elMsg.msg[elMsg.msg.length - 1].content;
                          }
                          return content;
                        })}
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
