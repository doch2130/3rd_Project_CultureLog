import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Homeyeong.css';
import ReactTypingEffect from 'react-typing-effect';
import HomeCalendar from './HomeCalendar';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../hoc/auth';

// Main Page
function Home() {
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
      <Row style={{ height: '77%', margin: '50px' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <HomeCalendar />
              <Col xs={12} style={{ padding: '6px 12px' }}>
                <p className="calendarFooter">
                  달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를 남길
                  수 있는 작성창으로 이동합니다.
                </p>
              </Col>
            </Col>
            <Col xs={12} md={6}>
              <Row style={{ height: '100%' }}>
                <Col
                  xs={12}
                  style={{
                    height: '33%',
                    // textAlign: 'center',
                    // justifyContent: 'center',
                  }}
                >
                  <ReactTypingEffect
                    text={['고스란히 기록하는 나의 문화생활']}
                    style={{
                      backgroundColor: '#FFC6C3	',
                      fontSize: '35px',
                      fontWeight: '600',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '13.9px',
                      marginTop: '50px',
                      color: '#3C5087',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    모든 것이 바쁘게 흘러가는 요즘, 문화생활까지 덧없이 자연스레
                    지나쳐버리게 되는 날이 많아집니다. <br /> CultureLog는 내가
                    보고 듣고 읽은 것들을 기록하는 공간입니다. <br /> 자신이
                    경험한 문화생활과 리뷰, 그리고 생각을 기록하며 삶의 빈 곳을
                    채워보는 건 어떨까요?
                  </p>
                </Col>
                <hr style={{ borderTop: '1px dashed #7f3333' }} />

                <Col xs={12} style={{ height: '50%' }}>
                  {/* <img
                    src="http://placehold.it/320x100?text=sample"
                    alt="temporary"
                    id="tempImg"
                  /> */}
                  <div>2023년 2월 14일(임시)</div>
                  게시판 구현 예정입니다.
                </Col>

                <hr />
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

export default Auth(Home, true);
