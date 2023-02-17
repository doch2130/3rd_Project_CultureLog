import React, { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ChatbotRoom.css';
import { socketMessageAdd } from '../../actions/socket_action';

export default function ChatbotRoom({ mySocketId, myRoomId, userInfo }) {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const message = useSelector((state) => state.socket.message[0][myRoomId]);
  const date = new Date();
  const chatInput = useRef();

  // const messageTemp = message[0][myRoomId];
  // const [messageData, setMessageData] = useState([]);
  // console.log(myRoomId);
  // console.log(message[0]);
  // console.log('messageTemp', messageTemp);
  // console.log('messageData', messageData);

  // useEffect(() => {
  //   // console.log(Object.keys(messageTemp));
  //   const newMessageData = [];
  //   for (let i = 0; i < Object.keys(messageTemp).length; i++) {
  //     newMessageData.push({ [i]: messageTemp[i] });
  //     setMessageData(newMessageData);
  //   }
  // }, []);

  console.log('message', message);

  useEffect(() => {
    function messageRecive(data) {
      console.log('qweqwe');
      // console.log(data);
      // if (data.socketId === mySocketId) {
      const messageTempData = {
        permission: userInfo.permission,
        content: data.content,
        time: data.time,
        socketId: data.socketId,
        userId: data.userId,
      };
      const messageLength = Object.keys(message).length;
      console.log('messageLength', messageLength);
      const newMessage = {
        roomId: myRoomId,
        messageLength: messageLength,
        msg: messageTempData,
      };
      dispatch(socketMessageAdd(newMessage));
    }

    socket.on('receiveMessage', messageRecive);

    return () => {
      socket.off('receiveMessage', messageRecive);
    };
  }, [socket, message, myRoomId, dispatch, userInfo]);

  function messageSend() {
    // console.log('chatInput: ', chatInput.current.value);
    socket.emit('message', {
      content: chatInput.current.value,
      socketId: mySocketId,
      roomId: myRoomId,
      permission: userInfo.permission,
      userId: userInfo.userId,
      time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    });
  }

  // function messageRecive() {
  //   // console.log('asdasdas');
  //   socket.on('receiveMessage', (data) => {
  //     console.log('qweqwe');
  //     // console.log(data);
  //     // if (data.socketId === mySocketId) {
  //     const messageTempData = {
  //       permission: userInfo.permission,
  //       content: data.content,
  //       time: data.time,
  //     };
  //     const messageLength = Object.keys(message).length;
  //     console.log('messageLength', messageLength);
  //     const newMessage = {
  //       roomId: myRoomId,
  //       messageLength: messageLength,
  //       msg: messageTempData,
  //       msg2: { [messageLength]: messageTempData },
  //     };

  //     dispatch(socketMessageAdd(newMessage));

  //     // console.log('message', message);
  //     // const newMessage = { [messageLength]: messageTempData };
  //     // const temp = (message[messageLength] = newMessage);
  //     // console.log('temp', temp);
  //     // const newArray = [ ...message, newMessage ];
  //     // dispatch(socketMessageAdd(newArray));

  //     // const messageLength = Object.keys(messageData).length;
  //     // const newMessage = { [messageLength]: messageTempData };
  //     // const newArray = [...messageData, newMessage];
  //     // // console.log('newMessage', newMessage);
  //     // // console.log('Object.keys(messageData)', Object.keys(messageData));
  //     // // console.log('messageLength', messageLength);
  //     // // newMessage.push({ [messageLength]: messageTempData });
  //     // // console.log('newMessage222', newMessage);
  //     // // setMessageData(newMessage);
  //     // setMessageData(newArray);
  //     // console.log('newArray', newArray);
  //     // }
  //   });
  // }

  useEffect(() => {
    // 채팅방 스크롤 아래로 내리기
    const chatWindowAreaScroll = document.getElementById(
      'chatWindowAreaScroll'
    );
    chatWindowAreaScroll.scrollTop = chatWindowAreaScroll.scrollHeight;
  }, []);

  function messageRender() {
    const result = [];
    console.log('message lee', Object.keys(message).length);
    for (let i = 0; i < Object.keys(message).length; i++) {
      let temp = '',
        tempHour = '';
      if (Number(message[i].time.slice(-8, -6)) < 12) {
        temp = '오전 ' + message[i].time.slice(-7, -3);
      } else {
        if (Number(message[i].time.slice(-8, -6)) > 12) {
          tempHour = Number(message[i].time.slice(-8, -6)) - 12;
        }
        temp = '오후 ' + tempHour + message[i].time.slice(-10, -3);
      }
      result.push(
        <Row
          key={i}
          className={
            message[i].permission === 'server'
              ? 'serverMessageWrap'
              : message[i].socketId === mySocketId
              ? 'myMessageWrap'
              : 'youMessageWrap'
          }
        >
          <Col xs={12}>
            {message[i].permission === 'server' ? (
              <></>
            ) : message[i].socketId !== mySocketId ? (
              <div>
                <span className="youMessageName">{message[i].userId}</span>
              </div>
            ) : (
              <></>
            )}
            <div>
              {message[i].permission === 'server' ? (
                <pre className="serverMessageText">{message[i].content}</pre>
              ) : message[i].socketId === mySocketId ? (
                <>
                  <span className="myMessageTime">{temp}</span>
                  <pre className="myMessageText">{message[i].content}</pre>
                </>
              ) : (
                <>
                  <pre className="youMessageText">{message[i].content}</pre>
                  <span className="youMessageTime">{temp}</span>
                </>
              )}
            </div>
          </Col>
        </Row>
      );
    }
    return result;
  }

  return (
    <>
      {/* 채팅창 */}
      <Row className="chatWindowAreaWrap">
        <Col xs={12} id="chatWindowAreaScroll">
          {messageRender()}
          {/* 테스트용 */}
          {/* <ChatbotTestComponent /> */}

          {/* <Row className="serverMessageWrap">
            <Col xs={12}>
              <div>
                <pre className="serverMessageText">
                  만들기. 만들기. 만들기.만들기 만들기 만들기 만들기.
                  갑습니다요. <br />
                  CSS 만들기 어려워요
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="myMessageWrap">
            <Col xs={12}>
              <div>
                <span className="myMessageTime">오후 10:12</span>
                <pre className="myMessageText">
                  안녕하세요. 반갑습니다. 반갑습니다요.반갑습니다갑습니다요.
                  갑습니다요. <br />
                  CSS 만들기 어려워요
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="youMessageWrap">
            <Col xs={12}>
              <div>
                <span className="youMessageName">관리자</span>
              </div>
              <div>
                <pre className="youMessageText">
                  저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염
                </pre>
                <span className="youMessageTime">오후 1:49</span>
              </div>
            </Col>
          </Row> */}
        </Col>
      </Row>

      {/* 채팅 Footer */}
      <Row className="chatWindowFooter">
        {/* 입력 창 */}
        <Col xs={12}>
          <textarea ref={chatInput} rows="1"></textarea>
        </Col>
        {/* 전송 버튼 */}
        <Col xs={12}>
          <button id="sendBtn" type="button" onClick={() => messageSend()}>
            전송
          </button>
        </Col>
      </Row>
    </>
  );
}
