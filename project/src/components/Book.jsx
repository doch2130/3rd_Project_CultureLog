import React from 'react';
import styled from 'styled-components';
import Header from './Header';

export default function Book() {
  const MyDiv = styled.div`
    margin: auto;
    margin-top: 120px;
    width: 1130px;
    padding: 180px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #d0d6c3;
    border-radius: 20px;
    input {
      width: 400px;
      height: 60px;
      display: flex;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1.5px solid black;
      outline: none;
      background-color: #d0d6c3;
    }
  `;
  return (
    <>
      <Header />
      <MyDiv>
        <input type="text" value="날짜" />
        <input type="text" value="제목" />
        <input type="text" value="저자" />
        <input type="text" value="장르" />
        <input type="text" value="후기" />
      </MyDiv>
    </>
  );
}
