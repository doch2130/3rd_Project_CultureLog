import React, { useState } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ChatbotManager.css';
import ChatbotRoom from './ChatbotRoom';
import { socketManagerRoomLeave } from '../../actions/socket_action';

export default function ChatbotManager({ mySocketId, myRoomId, userInfo }) {
  const roomList = useSelector((state) => state.socket.roomList);
  const message = useSelector((state) => state.socket.message);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const [selectRoom, setSelectRoom] = useState(null);
  const handleClose = () => setSelectRoom(null);
  const [roomExitData, setRoomExitData] = useState();
  // const [roomMessageCount, setRoomMessageCount] = useState([]);

  // useEffect(() => {
  //   console.log('myRoomId', myRoomId);
  //   console.log('message', message[0]);
  //   // console.log('Object message', Object.keys(message[0]));
  //   const messageList = Object.keys(message[0]);
  //   console.log('messageList', messageList);
  //   let temp = [];
  //   messageList.forEach((el) => {
  //     // console.log('el', el);
  //     // console.log('message[0][el] length', Object.keys(message[0][el]).length);
  //     if (el !== myRoomId) {
  //       const data = {
  //         roomId: el,
  //         msgCount: Object.keys(message[0][el]).length,
  //       };
  //       temp.push(data);
  //     }
  //   });
  //   console.log('temp', temp);
  //   setRoomMessageCount(temp);
  // }, []);

  // 방에서 마우스 우클릭 시 설정
  const roomMouseRightClick = (e, el) => {
    // 방 나가기 위한 우클릭 클릭할 때 데이터 받아와서 저장
    console.log('el', el);
    setRoomExitData(el);
    // 기본 메뉴 나오지 않게 설정
    e.preventDefault();
    const x = e.pageX - 100 + 'px'; // 현재 마우스의 X좌표
    const y = e.pageY + 'px'; // 현재 마우스의 Y좌표
    const roomMouseRightClickWrap = document.getElementById(
      'roomMouseRightClickWrap'
    )
      ? document.getElementById('roomMouseRightClickWrap')
      : 'notRoomMouseRightClickWrap';

    if (roomMouseRightClickWrap !== 'notRoomMouseRightClickWrap') {
      console.log('roomMouseRightClick', roomMouseRightClickWrap);
      roomMouseRightClickWrap.style.display = 'flex';
      roomMouseRightClickWrap.style.left = x;
      roomMouseRightClickWrap.style.top = y;
    }
  };
  // 다른 곳 클릭 시 사라지게 설정
  document.addEventListener('click', function (e) {
    // 방 마우스 우클릭 용 변수 설정
    const roomMouseRightClickWrap = document.getElementById(
      'roomMouseRightClickWrap'
    )
      ? document.getElementById('roomMouseRightClickWrap')
      : 'notRoomMouseRightClickWrap';
    if (roomMouseRightClickWrap !== 'notRoomMouseRightClickWrap') {
      roomMouseRightClickWrap.style.display = 'none';
    }
  });

  // 방 나가기
  const roomExit = () => {
    if (roomExitData) {
      // 서버에 방 나가기 클릭 시 DB 데이터 삭제
      socket.emit('leaveRoom', roomExitData.roomId);
      // 리듀서에서 해당 방 정보 삭제
      dispatch(socketManagerRoomLeave(roomExitData.roomId));
    }
  };

  return (
    <>
      {/* 방 출력용 */}
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
            myRoomId={selectRoom !== null ? selectRoom.roomId : myRoomId}
            userInfo={userInfo}
            message={message}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {/* 마우스 오른쪽 이벤트 */}
      <div
        id="roomMouseRightClickWrap"
        style={{
          display: 'none',
        }}
      >
        <ul type="none" style={{ margin: '0px', padding: '0px' }}>
          <li style={{ cursor: 'pointer' }} onClick={() => roomExit()}>
            방 나가기
          </li>
        </ul>
      </div>

      {/* 채팅방 리스트 */}
      <Row className="chatRoomWindowAreaWrap">
        <Col xs={12}>
          {roomList.length === 0 ? (
            <div className="roomEmptyMessage">
              <span>상단의 새로고침 버튼을 눌러주세요.</span>
            </div>
          ) : (
            <span></span>
          )}
          {/* 방 목록 */}
          {roomList.map((el) => {
            // console.log('el', el);
            return (
              <Row
                className="chatRoomList"
                key={el.roomId}
                onClick={() => {
                  setSelectRoom(el);
                  // console.log('el', el);
                }}
                onContextMenu={(e) => {
                  roomMouseRightClick(e, el);
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
                        {/* {roomMessageCount.map((elCount) => {
                          if (elCount.roomId === el.roomId) {
                            // console.log('Object.keys(message[0][el.roomId]).length',Object.keys(message[0][el.roomId]).length);
                            const tempCount =
                              Object.keys(message[0][el.roomId]).length -
                              elCount.msgCount;
                            return tempCount;
                          }
                        })} */}
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
