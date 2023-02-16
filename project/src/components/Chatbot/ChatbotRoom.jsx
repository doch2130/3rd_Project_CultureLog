import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './ChatbotRoom.css';
import ChatbotTestComponent from './ChatbotTestComponent';
// import { useSelector } from 'react-redux';

export default function ChatbotRoom() {
  // const socket = useSelector((state) => state.socket.socket);
  // const date = new Date();
  useEffect(() => {
    // 채팅방 스크롤 아래로 내리기
    const chatWindowAreaScroll = document.getElementById(
      'chatWindowAreaScroll'
    );
    chatWindowAreaScroll.scrollTop = chatWindowAreaScroll.scrollHeight;
  });

  return (
    <>
      {/* 채팅창 */}
      <Row className="chatWindowAreaWrap">
        <Col xs={12} id="chatWindowAreaScroll">
          {/* 테스트용 */}
          <ChatbotTestComponent />
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
        </Col>
      </Row>

      {/* 채팅 Footer */}
      <Row className="chatWindowFooter">
        {/* 입력 창 */}
        <Col xs={12}>
          <textarea rows="1"></textarea>
        </Col>
        {/* 전송 버튼 */}
        <Col xs={12}>
          <button id="sendBtn" type="button">
            전송
          </button>
        </Col>
      </Row>
    </>
  );
}
