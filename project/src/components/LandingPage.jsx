import React, { useEffect, useState } from 'react';
import Auth from '../../src/hoc/auth';
import githubLogo from '../github.png';
import notionLogo from '../notion.png';
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
        // console.log('data', response.data);
        setPerfo(response.data[0].length);
        setBook(response.data[1].length);
        setMovie(response.data[2].length);
      });
    }
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          padding: '50px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '2000px',
            margin: 'auto',
            paddingLeft: '200px',
            paddingRight: '200px',
          }}
        >
          <span style={{ color: '#545d42', fontSize: '4rem' }}>
            나만의 문화 기록, Culture Log
          </span>
          <br />
          <br />
          <br />
          <br />
          <br />
          <span
            style={{ color: '#545d42', fontSize: '1rem', marginLeft: '60px' }}
          >
            전체 사용자 문화 기록 현황
          </span>
          <br />
          <br />
          <Chart movie={movie} book={book} perfo={perfo} />
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              padding: '50px',
              alignItems: 'center',
              borderColor: '#545d42',
              borderBlockStyle: 'dashed',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
              github{' '}
              <a href="https://github.com/CultureBox/3rd_Project">
                <img
                  src={githubLogo}
                  style={{ width: '30px', margin: '5px' }}
                  alt="github 주소"
                />
              </a>
            </span>
            <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
              Notion{' '}
              <a href="https://burnt-bike-223.notion.site/Culture-Log-0416219a3d8d4b81925a4042e50e1716">
                <img
                  src={notionLogo}
                  style={{ width: '30px', margin: '5px' }}
                  alt="notion 주소"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth(LandingPage, null);
