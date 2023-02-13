import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import musicalImg from '../musical.jpeg';

export default function Movie() {
  const submit = () => {
    console.log(alert('게시물이 등록되었습니다'));
  };
  const Div6 = styled.div`
    margin: auto;
    margin-top: 120px;
    width: 1300px;
    padding: 180px;
    text-align: center;
    display: flex;
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

  const Button = styled.button`
    width: 150px;
    height: 50px;
    margin-top: 750px;
    margin-left: -600px;
    text-align: center;
    box-sizing: border-box;
    border: 3px solid white;
    appearance: none;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    &:hover,
    &:focus {
      color: #92c6b6;
      outline: 0;
    }
    cursor: pointer;
    background-color: transparent;
    border-radius: 0.6em;
    color: white;
    transition: box-shadow 200ms ease-in-out, color 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px white inset;
    }
    @media screen and (max-width: 700px) {
      flex-direction: column;
      margin-top: 60px;
      margin-left: -10px;
      align-items: center;
      width: 200px;
      display: flex;
      padding-top: 11px;
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
    margin-top: 50px;
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
        <Img src={musicalImg} alt="예시이미지"></Img>
        <Div7>
          <Input type="text" value="날짜" />
          <Input type="text" value="제목" />
          <Input type="text" value="극장" />
          <Input type="text" value="주연배우" />
          <Input type="text" value="개인평점" />
          <Input type="text" value="후기" />
        </Div7>
        <Button onClick={submit}>등록하기</Button>
      </Div6>
    </>
  );
}
