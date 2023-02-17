import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import musicalImg from '../musical.jpeg';
// import YeongCalendar from './YeongCalendar';
// import moment from 'moment';
// import Calendar from 'react-calendar';
import { callPerfoAPI } from '../actions/logdata_action';
import { useDispatch, useSelector } from 'react-redux';
import { dateData } from '../actions/date_action';

export default function Movie(props) {
  const clientTitle = useSelector((state) => state.logdata.perfoinfo);
  const dispatch = useDispatch();
  const [searchClass, setSearchClass] = useState('searchBoard');
  const [Imgsrc, setImgsrc] = useState(musicalImg);
  const perfoSearch = useRef();
  const date = useSelector(dateData);
  console.log(date);
  const onKeyPress = (e) => {
    if (e.key == 'Enter') search();
  };
  const search = async () => {
    const result = await callPerfoAPI({
      title: perfoSearch.current.value,
    });
    console.log('component', result);
    // dispatch(result);
    // setSearchClass('searchBoard');
    // perfoSearch.current.value = '';
    // dispatch를 실행할 때는 action을 보내야 한다. action은 객체형태 즉, {} 형태여야 한다.
  };
  function titleconfirm(e) {
    // let bookform = clientTitle[e.target.className];
    // setSearchClass('d-none');
    // titleNyear.current.value = `${bookform.title}(${bookform.publisher})`;
    // author.current.value = bookform.author;
    // genre.current.value = bookform.categoryName;
    // setImgsrc(bookform.img);
  }
  const submit = () => {
    console.log(alert('게시물이 등록되었습니다'));
  };
  //const [value, setValue] = useState();
  //<Calendar onChange={() => setValue} value={value} />
  return (
    <>
      <Div6>
        <Img src={Imgsrc} alt="예시이미지"></Img>
        <Div7>
          <SearchInput
            type="text"
            name="search"
            placeholder="책 제목을 검색하세요"
            ref={perfoSearch}
            onKeyPress={onKeyPress}
          />
          <SearchBtn type="button" onClick={search}>
            검색
          </SearchBtn>
          <div className={searchClass}>
            {clientTitle.length < 1
              ? '책을 찾을 수 없습니다'
              : clientTitle.map((el, index) => (
                  <p
                    key={el.img}
                    className={index}
                    dangerouslySetInnerHTML={{
                      __html: `${el.title},${el.author},${el.publisher}`,
                    }}
                    onClick={titleconfirm}
                  ></p>
                ))}
          </div>
          <p> 날짜</p>
          <p>{date}</p>

          <p>
            제목
            <Input type="text" />
          </p>
          <p>
            극장
            <Input type="text" />
          </p>
          <Input type="text" value="주연배우" />
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
const SearchInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  outline: none;
  background-color: #d0d6c3;
  color: #fefefe;
  width: 400px;
  height: 100px;
  display: inline-block;
  flex-wrap: wrap;
  @media screen and (max-width: 700px) {
    width: 400px;
    margin-left: -180px;
  }
`;

const SearchBtn = styled.button`
  width: 80px;
  height: 50px;
  margin-top: 0px;
  margin-left: 600px;
  text-align: center;
  box-sizing: border-box;
  border: 2px solid white;
  appearance: none;
  font-size: 1.1rem;
  font-weight: 500;
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
  margin-top: 70px;
  width: 400px;
  height: 590px;
  border-radius: 20px;
  @media screen and (max-width: 700px) {
    text-align: center;
    margin-top: -130px;
    margin-left: -126px;
  }
`;
