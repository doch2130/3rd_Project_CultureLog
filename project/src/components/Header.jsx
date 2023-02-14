import React from 'react';
import { Link } from 'react-router-dom';
import boxImg from '../box.png';
import styled from 'styled-components';

export default function Header() {
  const imgStyle = { width: '50px', marginLeft: '10px' };
  const Nav = styled.nav`
    width: 100%;
    text-align: center;
    //  background-color: #dacea8;
    //  height: '50px';
    li {
      list-style: none;
      height: 100px;
    }
    p {
      color: #828282;
    }
  `;

  return (
    <>
      <Nav>
        <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
          <li>
            {' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '30px' }}>HOME</p>
            </Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={boxImg} alt="상자" style={imgStyle}></img>
              <p style={{ fontSize: '60px', marginTop: '-35px' }}>CultureLog</p>
            </Link>
          </li>
          <li>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '30px' }}>LOGIN</p>
            </Link>
          </li>
        </ul>
      </Nav>
    </>
  );
}
