import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function ChatbotManagerRoom() {
  return (
    <>
      {/* 방 1개 */}
      <Row className="chatRoomList">
        <Col xs={12} style={{ padding: '0px 5px' }}>
          <Row>
            <Col xs={9} style={{ padding: '0px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                일이삼사오육칠팔구십
              </span>
            </Col>
            <Col xs={3} style={{ padding: '0px', textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem' }}>오전 11:30</span>
            </Col>
          </Row>
          <Row>
            <Col xs={9} style={{ padding: '0px' }}>
              <pre className="chatRoomListContent">
                안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요.
                안녕하세요. 안녕하세요. 안녕하세요.
              </pre>
            </Col>
            <Col xs={3} style={{ padding: '0px', textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem' }}>알람</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
