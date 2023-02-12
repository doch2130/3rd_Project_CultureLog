import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import avatarImg from '../avatar.jpeg';

export default function Book() {
  // const isPc = useMediaQuery({
  //   query: '(min-width:1024px)',
  // });
  // const isTablet = useMediaQuery({
  //   query: '(min-width:768px) and (max-width:1023px)',
  // });
  // const isMobile = useMediaQuery({
  //   query: '(max-width:767px)',
  // });

  const Div6 = styled.div`
    margin: auto;
    margin-top: 120px;
    width: 1300px;
    padding: 180px;
    text-align: center;
    display: flex;
    flex-direction: row;
    background-color: #d0d6c3;
    border-radius: 50px;
    @media screen and (max-width: 700px) {
      flex-direction: column;
      margin-top: 0px;
      margin-left: 30px;
      width: 500px;
      display: flex;
    }
  `;
  const Div7 = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
  `;
  const Input = styled.input`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.5px solid black;
    outline: none;
    background-color: #d0d6c3;
    color: #fefefe;
    width: 600px;
    height: 100px;
    display: inline-block;
    flex-wrap: wrap;
    @media screen and (max-width: 700px) {
      width: 400px;
      margin-left: -180px;
    }
  `;
  const Img = styled.img`
    margin-left: -100px;
    width: 400px;
    height: 500px;
    border-radius: 20px;
    @media screen and (max-width: 700px) {
      text-align: center;
      margin-top: -130px;
      margin-left: -126px;
    }
  `;
  return (
    <>
      <Header />

      <Div6>
        <Img src={avatarImg} alt="예시이미지"></Img>
        <Div7>
          <Input type="text" value="날짜입력" />
          <Input type="text" value="제목" />
          <Input type="text" value="저자" />
          <Input type="text" value="장르" />
          <Input type="text" value="후기" />
        </Div7>
      </Div6>
    </>
  );
}
