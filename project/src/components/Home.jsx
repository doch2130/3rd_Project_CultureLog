import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import HomeCalendar from './HomeCalendar';

// 메인 페이지

export default function Home() {
  return (
    <Container fluid>
      <Row style={{ height: '100%' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <HomeCalendar />
              <Col xs={12} style={{ padding: '6px 12px' }}>
                <p className="CalendarFooter">
                  날짜를 클릭하여 오늘의 문화를 기록하세요
                </p>
              </Col>
            </Col>
            <Col xs={12} md={6}>
              <Row style={{ height: '100%' }}>
                <Col xs={12} style={{ height: '50%' }}>
                  <img
                    src="http://placehold.it/320x100?text=sample"
                    alt="temporary"
                    id="tempImg"
                  />
                </Col>
                <Col xs={12} style={{ height: '50%', paddingTop: '10px' }}>
                  <div className="RecordYear">
                    <div className="RecordYearTitle">올해의 기록</div>
                    <div className="RecordYearSubTitle">
                      올해 나는 얼마나 채웠을까?
                    </div>
                  </div>
                  <div className="RecordYear">
                    <span>책</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="RecordYear">
                    <span>공연</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="RecordYear">
                    <span>영화</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
