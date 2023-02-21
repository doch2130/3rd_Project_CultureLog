import React from 'react';
import landingLogo from '../../src/logo.png';
import Auth from '../../src/hoc/auth';
import githubLogo from '../github.png';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/user_action';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function LandingPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.loginSuccess);
  // const onClickHandler = () => {
  //   axios.get(`/api/users/logout`).then((response) => {
  //     console.log(response.data);
  //     if (response.data.success) {
  //       //로그 아웃 되었을 때 어디 페이지로 갈 건지 정해야 함.
  //       //기본은 로그인 페이지..
  //       cookies.remove('x_auth');
  //       dispatch(logoutUser());
  //       navigate('/');
  //       alert('로그아웃 되었습니다.');
  //     } else {
  //       alert('로그아웃 실패.');
  //     }
  //   });
  // };
  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '50px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '1000px', margin: 'auto' }}>
          <span style={{ color: '#545d42', fontSize: '4rem' }}>
            나만의 문화 기록, Culture Log
          </span>
          <br />
          <br />
          <br />
          {/* {cookies.get('x_auth') ? (
            <li className="Header_logout">
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <p
                  style={{
                    fontSize: '27px',
                    fontWeight: '600',
                    color: '#b1bd96',
                  }}
                  onClick={onClickHandler}
                >
                  LOGOUT
                </p>
              </Link>
            </li>
          ) : (
            <>
              <span style={{ color: '#252e12', fontSize: '1rem' }}>
                로그인 버튼을 눌러 로그인을 먼저 해주세요
              </span>
              <li className="Header_login">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <p
                    style={{
                      fontSize: '30px',
                      fontWeight: '700',
                      color: '#b1bd96',
                    }}
                  >
                    LOGIN
                  </p>
                </Link>
              </li>
            </>
          )} */}

          <br />
          <br />
          <div
            style={{
              display: 'flex',
              padding: '50px',
              alignItems: 'center',
              borderColor: '#545d42',
              borderBlockStyle: 'dashed',
            }}
          >
            <span style={{ color: '#545d42', fontSize: '1rem' }}>
              github{' '}
              <a href="https://github.com/CultureBox/3rd_Project">
                <img
                  src={githubLogo}
                  style={{ width: '30px' }}
                  alt="github 주소"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth(LandingPage, null);
