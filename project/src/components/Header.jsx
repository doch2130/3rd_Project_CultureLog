import React from 'react';
import { Link } from 'react-router-dom';
import boxImg from '../box.png';

import styled from 'styled-components';

export default function Header() {
  const imgStyle = { width: '50px', marginLeft: '-1165px' };
  const Nav = styled.nav`
    width: 45%;
    flex-direction: column;
    display: flex;
    text-align: center;
    margin-left: 620px;
    justify-content: flex-start;
    li {
      color: aqua;
    }
  `;
  return (
    <>
      <Nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ul>
            <img src={boxImg} alt="상자" style={imgStyle}></img>
            Culture Box
          </ul>

          <ul>
            <Link to="/">메인</Link>
          </ul>

          <ul>
            <Link to="/login">로그인</Link>
          </ul>

          <ul>
            <Link to="/join">회원가입</Link>
          </ul>
        </ul>
      </Nav>
    </>
  );
}
