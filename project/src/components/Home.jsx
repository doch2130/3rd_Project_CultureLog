import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Homeyeong.css';
import ReactTypingEffect from 'react-typing-effect';
import HomeCalendar from './HomeCalendar';
import './Home.css';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Auth from '../hoc/auth';
import YeongCalendar from './YeongCalendar';
import axiosurl from '../axiosurl';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const P = styled.p`
  display: flex;
  font-size: 13.9px;
  margin-top: 50px;
  color: #3c5087;
  text-align: center;
  justify-content: center;
  margin-bottom: 550px;
  @media screen and (max-width: 880px) {
    overflow: scroll;
    height: 250px;
    display: flex;
    margin-bottom: 400px;
  }
`;

// Main Page
function Home() {
  const navigate = useNavigate();
  // const loginInformation = useSelector((state) => state.user.loginSuccess);
  // const [isManager, setIsManager] = useState(false);

  // console.log('userId', loginInformation);]
  const user = useSelector((state) => state.user.loginSuccess);
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    console.log(moment(new Date()).format('YYYY년'));

    console.log('공연:', yearData[0]);
    console.log('책:', yearData[1]);
    console.log('영화:', yearData[2]); //현재 영화만 값이 들어옴.

    axios({
      method: 'get',
      url: axiosurl.logOfyear,
      params: { date: moment(new Date()).format('YYYY년'), user: user.email },
    }).then((re) => {
      console.log('year', re.data);
      setYearData(re.data);
    });
    axios.get('/api/hello').then((response) => console.log(response));
  }, [user]);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('x_auth') != null) {
      navigate('/home');
    }
  }, []);
  return (
    <Container fluid>
      <Row style={{ height: '77%', margin: '50px' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <YeongCalendar />
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
                      fontSize: '33px',
                      fontWeight: '600',
                    }}
                  />
                  <P>
                    모든 것이 바쁘게 흘러가는 요즘, 문화생활까지 덧없이 자연스레
                    지나쳐버리게 되는 날이 많아집니다. <br /> CultureLog는 내가
                    보고 듣고 읽은 것들을 기록하는 공간입니다. <br /> 자신이
                    경험한 문화생활과 리뷰, 그리고 생각을 기록하며 삶의 빈 곳을
                    채워보는 건 어떨까요? <br />
                    <br />
                    달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를
                    남길 수 있는 작성창으로 이동합니다.
                  </P>
                </Col>

                <hr />

                {/* <hr style={{ borderTop: '1px dashed #7f3333' }} /> */}

                <Col xs={12} style={{ height: '70%', paddingTop: '10px' }}>
                  <div className="recordYear">
                    <div className="recordYearTitle">올해의 기록</div>
                    <div className="recordYearSubTitle">
                      올해 나는 얼마나 채웠을까?
                    </div>
                  </div>
                  <div className="recordYear">
                    <span>책</span>
                    <span>
                      {yearData.length > 0 ? yearData[1].length : '0000000'}
                    </span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>공연</span>
                    <span>
                      {yearData.length > 0 ? yearData[0].length : '0000000'}
                    </span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>영화</span>
                    <span>
                      {yearData.length > 0 ? yearData[2].length : '0000000'}
                    </span>
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
