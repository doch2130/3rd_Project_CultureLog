import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HomeCalendar from './HomeCalendar';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../hoc/auth';

// Main Page
export default function Home_Full_ver() {
  const navigate = useNavigate();
  // const loginInformation = useSelector((state) => state.user.loginSuccess);
  // const [isManager, setIsManager] = useState(false);
  // console.log('userId', loginInformation);

  useEffect(() => {
    axios.get('/api/hello').then((response) => console.log(response));

    // if (loginInformation.userId === '63ecad322ba25214448d088d') {
    //   setIsManager(true);
    // } else {
    //   setIsManager(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fluid>
      <Row style={{ height: '100%' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <HomeCalendar />
              <Col xs={12} style={{ padding: '6px 12px' }}>
                <p className="calendarFooter">
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
                  <div className="recordYear">
                    <div className="recordYearTitle">올해의 기록</div>
                    <div className="recordYearSubTitle">
                      올해 나는 얼마나 채웠을까?
                    </div>
                  </div>
                  <div className="recordYear">
                    <span>책</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>공연</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="recordYear">
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
