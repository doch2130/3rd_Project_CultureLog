import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Chatbot.css';
import ChatbotTestComponent from './ChatbotTestComponent';

export default function Chatbot() {
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
        <div className="chatWindowWrap">
          <Row>
            {/* 채팅창 닫기 버튼 */}
            <Col xs={12}>
              <div
                className="closeBtn"
                onClick={() => setIsChattingBox(!isChattingBox)}
              ></div>
            </Col>
          </Row>

          {/* 채팅창 */}
          <Row className="chatWindowAreaWrap">
            <Col xs={12}>
              {/* 내가 보낸 메시지 */}
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
              {/* 상대가 보낸 메시지 */}
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
              </Row>

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
        </div>
      )}
    </div>
  );
}
