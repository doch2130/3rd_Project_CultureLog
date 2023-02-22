import React, { useEffect, useState } from 'react';
import landingLogo from '../../src/logo.png';
import Auth from '../../src/hoc/auth';
import githubLogo from '../github.png';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/user_action';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axiosurl from '../axiosurl';
import Chart from './Chart';

function LandingPage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState('');
  const [book, setBook] = useState('');
  const [perfo, setPerfo] = useState('');

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('x_auth') != null) {
      navigate('/home');
    } else {
      axios({
        method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
        url: axiosurl.DBAll,
      }).then((response) => {
        console.log('data', response.data);
        setMovie(response.data[0].length);
        setBook(response.data[1].length);
        setPerfo(response.data[2].length);
      });
    }
  }, []);
  let body = {
    movie,
    book,
    perfo,
  };
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
          <br />
          <br />
          <Chart props={body} />
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
