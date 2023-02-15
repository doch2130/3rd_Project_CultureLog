import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './ChatbotRoom.css';
import ChatbotTestComponent from './ChatbotTestComponent';
export default function ChatbotRoom() {
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
