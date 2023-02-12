import React from 'react';
import { Link } from 'react-router-dom';
import boxImg from '../box.png';
import styled from 'styled-components';

export default function Header() {
  const imgStyle = { width: '50px', marginLeft: '10px' };
  const Nav = styled.nav`
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: flex-start;
  `;

  return (
    <>
      <Nav>
        <ul style={{ display: 'flex' }}>
          <img src={boxImg} alt="상자" style={imgStyle}></img>
          <p>Culture Box</p>
          <ul>
            <Link to="/">메인</Link>
          </ul>
          <ul>
            <Link to="/login">로그인</Link>
          </ul>
        </ul>
      </Nav>
    </>
  );
}
