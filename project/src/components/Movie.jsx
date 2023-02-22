import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../src/hoc/auth';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import examimg from '../movie.jpeg';
import './Movie.css';
import { callMovieAPI } from '../actions/logdata_action';
import { dateData } from '../actions/date_action';
import moment from 'moment';
import axios from 'axios';
import axiosurl from '../axiosurl';
import { loginUser } from '../actions/user_action';
import { Cookies } from 'react-cookie';

function Movie(props) {
  const clientTitle = useSelector((state) => state.logdata.movieinfo);
  const navigate = useNavigate();
  const P = useSelector((state) => state.date.date);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  console.log('p', P);
  // console.log('mo', moment(P));
  const [searchClass, setSearchClass] = useState('searchBoard');
  const [Imgsrc, setImgsrc] = useState(examimg);
  const movieSearch = useRef();
  const logDate = useRef();
  const titleNyear = useRef();
  const director = useRef();
  const actor = useRef();
  const review = useRef();

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('x_auth') == null) {
      navigate('/');
    }
  });

  const onKeyPress = (e) => {
    // eslint-disable-next-line eqeqeq
    if (e.key == 'Enter') search();
  };

  const search = async () => {
    const result = await callMovieAPI({
      title: movieSearch.current.value,
    });
    console.log('component', result);
    dispatch(result);
    setSearchClass('searchBoard');
    movieSearch.current.value = '';
    setOpen(true);
    // dispatch를 실행할 때는 action을 보내야 한다. action은 객체형태 즉, {} 형태여야 한다.
  };

  function titleconfirm(e) {
    let movieform = clientTitle[e.target.className];
    let title = e.target.innerText.split(',');
    console.log(movieform);
    if (title.length > 3) {
      titleNyear.current.value = `${title[0]}${title[1]}(${title[2]})`;
    } else {
      titleNyear.current.value = `${title[0]}(${title[1]})`;
    }
    setSearchClass('d-none');
    director.current.value = movieform.director;
    actor.current.value = movieform.actor;
    setImgsrc(movieform.img);
  }

  const user = useSelector((state) => state.user.loginSuccess);
  function submit() {
    axios({
      method: 'post',
      url: axiosurl.toDBmovie,
      data: {
        email: user.email,
        date: logDate.current.value,
        title: titleNyear.current.value,
        director: director.current.value,
        actor: actor.current.value,
        review: review.current.value,
      },
    }).then(() => {
      //console.log('todb', res.data);
      console.log(alert('게시물이 등록되었습니다'));
      navigate('/home');
    });
  }

  return (
    <>
      <Div6>
        <Img src={Imgsrc} alt="예시이미지"></Img>
        <Div7>
          <SearchInput
            type="text"
            name="search"
            placeholder="영화 제목을 검색하세요"
            ref={movieSearch}
            onKeyPress={onKeyPress}
          />
          <SearchBtn type="button" onClick={search}>
            검색
          </SearchBtn>
          {open === true ? (
            <Div8 className={searchClass}>
              {clientTitle.length < 1
                ? '영화를 찾을 수 없습니다'
                : clientTitle.map((el, index) => (
                    <p
                      // key={el.img}
                      key={index}
                      className={index}
                      dangerouslySetInnerHTML={{
                        __html: `${el.title},${el.pubDate},${el.director}`,
                      }}
                      onClick={titleconfirm}
                    ></p>
                  ))}
            </Div8>
          ) : null}

          <Input
            type="text"
            ref={logDate}
            defaultValue={moment(P).format('YYYY년 MM월 DD일')}
          />
          <Input ref={titleNyear} type="text" placeholder="제목(개봉년도)" />
          <Input type="text" ref={director} placeholder="감독" />
          <Input type="text" ref={actor} placeholder="주연배우" />

          <textarea ref={review} placeholder="후기를 작성해주세요" />
        </Div7>
        <RegisterBtn onClick={submit}>등록하기</RegisterBtn>
      </Div6>
    </>
  );
}

const Div6 = styled.div`
  margin: auto;
  margin-top: 70px;
  height: 1200px;
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
    height: 1610px;
    display: flex;
  }
`;
const RegisterBtn = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 900px;
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
    margin-top: 55px;
    margin-left: -10px;
    align-items: center;
    width: 200px;
    display: flex;
    padding: 11px 0px;
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
const Div7 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  p {
    color: #090909;
    font-weight: 700;
  }

  textarea {
    margin-top: 128px;
    margin-left: 23px;
    outline: none;
    background-color: #fffafb80;
    color: #353434;
    border-radius: 15px;
    width: 600px;
    height: 36px;
    display: inline-block;
    height: 300px;
    scroll-behavior: smooth;
    @media screen and (max-width: 700px) {
      margin-left: -178px;
      align-items: center;
      width: 407px;
      display: flex;
      padding-top: 11px;
      scroll-behavior: smooth;
    }
  }
`;

const Div8 = styled.div`
  position: absolute;
  top: 30.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  width: 700px;
  box-shadow: 1px 1px 1px 1px gray;
  background-color: #e3a49f;
  @media screen and (max-width: 700px) {
    width: 400px;
    margin-left: -180px;
    top: 47rem;
  }
`;

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

const SearchInput = styled.input`
  border: 2px solid white;
  margin-bottom: -3px;
  margin-left: 20px;
  border-radius: 20px;
  outline: none;
  color: #010101;
  width: 420px;
  height: 52px;
  display: inline-block;
  flex-wrap: wrap;
  @media screen and (max-width: 700px) {
    width: 300px;
    margin-top: 20px;
    margin-left: -170px;
    margin-bottom: 10px;
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
export default Auth(Movie, true, true);
