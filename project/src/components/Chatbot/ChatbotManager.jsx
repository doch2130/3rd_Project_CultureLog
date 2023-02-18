import React, { useEffect, useState } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ChatbotManager.css';
import ChatbotRoom from './ChatbotRoom';

export default function ChatbotManager({ mySocketId, myRoomId, userInfo }) {
  const roomList = useSelector((state) => state.socket.roomList);
  const message = useSelector((state) => state.socket.message);
  // const roomId = useSelector((state) => state.socket.roomList);
  const [selectRoom, setSelectRoom] = useState(null);
  const handleClose = () => setSelectRoom(null);
  // console.log('roomList', roomList);

  useEffect(() => {
    const roomEmpty = () => {
      const chatRoomWindowAreaWrap = document.getElementsByClassName(
        'chatRoomWindowAreaWrap'
      );
      const div = document.createElement('div');
      div.classList.add('roomEmptyMessage');
      const temp = '<span>상단의 새로고침 버튼을 눌러주세요.</span>';
      div.innerHTML = temp;
      chatRoomWindowAreaWrap[0].children[0].append(div);
    };
    if (roomList.length === 0) {
      roomEmpty();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ChatbotRoom
            mySocketId={mySocketId}
            myRoomId={selectRoom !== null ? selectRoom.roomId : mySocketId}
            userInfo={userInfo}
            message={message}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {/* 채팅방 리스트 */}
      <Row className="chatRoomWindowAreaWrap">
        <Col xs={12}>
          {/* 방 목록 */}
          {roomList.map((el) => {
            // console.log('el', el);
            document.getElementsByClassName('roomEmptyMessage')[0].textContent =
              '';
            return (
              <Row
                className="chatRoomList"
                key={el.roomId}
                onClick={() => {
                  setSelectRoom(el);
                  console.log('el', el);
                }}
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
                        {/* 상대방 아이디 */}
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
                        {/* 마지막 대화 시간 가져오기 */}
                        {message.map((elMsg) => {
                          let time = '';
                          for (let i = 0; i < Object.keys(elMsg).length; i++) {
                            if (el.roomId === Object.keys(elMsg)[i]) {
                              time =
                                elMsg[el.roomId][
                                  Object.keys(elMsg[el.roomId]).length - 1
                                ].time;
                              break;
                            }
                          }
                          let tempHour = '';
                          if (Number(time.slice(-8, -6)) < 12) {
                            time = '오전 ' + time.slice(-7, -3);
                          } else {
                            if (Number(time.slice(-8, -6)) > 12) {
                              tempHour = Number(time.slice(-8, -6)) - 12;
                              time = '오후 ' + tempHour + time.slice(-6, -3);
                            } else {
                              time = '오후 ' + tempHour + time.slice(-8, -3);
                            }
                          }
                          return time;
                        })}
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
                          for (let i = 0; i < Object.keys(elMsg).length; i++) {
                            if (el.roomId === Object.keys(elMsg)[i]) {
                              content =
                                elMsg[el.roomId][
                                  Object.keys(elMsg[el.roomId]).length - 1
                                ].content;
                              break;
                            }
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
