import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function ChatbotTestComponent() {
  return (
    <>
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
    </>
  );
}
