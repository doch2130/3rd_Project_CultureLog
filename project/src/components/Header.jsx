import React from 'react';
import { Link } from 'react-router-dom';
import boxImg from '../box.png';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const imgStyle = { width: '50px', marginLeft: '10px', marginTop: '10px' };
  const Nav = styled.nav`
    width: 100%;
    text-align: center;
    li {
      list-style: none;
      height: 70px;
    }
    p {
      color: #572b2b;
      margin-top: 20px;
    }
  `;
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        //로그 아웃 되었을 때 어디 페이지로 갈 건지 정해야 함.
        //기본은 로그인 페이지..
        navigate('/');
        alert('로그아웃 되었습니다.');
      } else {
        alert('로그아웃 실패.');
      }
    });
  };

  return (
    <>
      <Nav>
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <li>
            <Link to="/">
              <img src={boxImg} alt="상자" style={imgStyle}></img>
            </Link>
          </li>
          <li>
            {' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '25px' }}>HOME</p>
            </Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p
                style={{
                  fontSize: '50px',
                  marginTop: '4px',
                }}
              >
                CultureLog
              </p>
            </Link>
          </li>
          <li className="Header_login">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '25px' }}>LOGIN</p>
            </Link>
          </li>
          <li className="Header_logout">
            {/* <Link to="/" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '20px' }} onClick={onClickHandler}>
                LOGOUT
              </p>
            </Link> */}
          </li>
        </ul>
      </Nav>
      <hr style={{ color: '#572b2b', borderTop: '3px double #572b2b' }} />
    </>
  );
}
