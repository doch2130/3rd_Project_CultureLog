import React, { useState } from 'react';
import styled from 'styled-components';
import bookImg from '../book.jpeg';

export default function Book() {
  const submit = () => {
    console.log(alert('게시물이 등록되었습니다'));
  };

  const [search, setSearch] = useState('');
  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // const filterTitle = movies.filter((p) => {
  //   return p.title
  //     .replace(' ', '')
  //     .toLocaleLowerCase()
  //     .includes(search.toLocaleLowerCase().replace(' ', ''));
  // });
  //includes함수는 배열의 특정 요소가 포함하는지 판별해 주는 boolean타입으로 입력한 검색어를 true & false로 나눠준다.

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
    margin-top: 946px;
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
      margin-top: 80px;
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

    p {
      color: white;
      font-weight: 700;
    }

    textarea {
      margin-top: -36px;
      margin-left: 100px;
      outline: none;
      background-color: #d0d6c3;
      color: #fefefe;
      width: 600px;
      height: 36px;
      display: inline-block;
      height: 200px;
      @media screen and (max-width: 700px) {
        margin-top: 26px;
        margin-left: -162px;
        align-items: center;
        width: 407px;
        display: flex;
        padding-top: 11px;
      }
    }
  `;

  //후기란 p 태그
  const pStyle = {
    marginTop: '60px',
    marginLeft: '-595px',
  };

  const Input = styled.input`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.5px solid black;
    margin-top: 60px;
    margin-left: 20px;
    outline: none;
    background-color: #d0d6c3;
    color: #fefefe;
    width: 600px;
    height: 36px;
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
      <Div6>
        <Img src={bookImg} alt="예시이미지"></Img>
        <Div7>
          <p>
            날짜
            <Input type="date" />
          </p>
          <p>
            제목
            <Input type="text" value={search} onChange={onChange} />
          </p>
          <p>
            저자
            <Input type="text" />
          </p>
          <p>
            장르
            <Input type="text" />{' '}
          </p>
          <p>
            개인평점
            <Input type="text" />
          </p>
          <p style={pStyle}>후기</p>
          <textarea placeholder="후기를 작성해주세요" />
        </Div7>
        <Button onClick={submit}>등록하기</Button>
      </Div6>
    </>
  );
}
