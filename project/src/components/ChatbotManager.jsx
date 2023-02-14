import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './ChatbotManager.css';
import ChatbotManagerRoom from './ChatbotManagerRoom';

export default function ChatbotManager() {
  const [isChattingBox, setIsChattingBox] = useState(false);

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
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
              <ChatbotManagerRoom />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
