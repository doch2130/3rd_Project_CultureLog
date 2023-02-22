/* eslint-disable no-sequences */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
import Pop from './Pop';
import { dateData } from '../actions/date_action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosurl from '../axiosurl';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Div5 = styled.div`
  margin-left: 10px;
`;
export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  //타이틀 눌렀을 때 누른 게시글 보게끔
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectPerformance, setSelectPerformance] = useState(null);
  const handlePerformanceClose = () => setSelectPerformance(null);
  const [selectBook, setSelectBook] = useState(null);
  const handleBookClose = () => setSelectBook(null);
  const [selectMovie, setSelectMovie] = useState(null);
  const handleMovieClose = () => setSelectMovie(null);
  const [marks, setMarks] = useState([]);
  //const marking = [rep.data];

  // // 하이라이트 표시를 위한 배열
  const fromDBdate = () => {};
  const dispatch = useDispatch();
  const P = useSelector((state) => state.date.date);
  // const marks = [{ P }];
  //const marks = [moment(P).format('DD-MM-YYYY')];
  //const marks = data.map((item) => new Date(item.date));
  console.log('내가선택한날짜', value); // 내가 선택한 날짜
  const user = useSelector((state) => state.user.loginSuccess);

  const handleDayClick = (value, event) => {
    //console.log('user', user);
    const clickedDate = moment(value).format('YYYY년 MM월 DD일');
    axios({
      method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
      url: axiosurl.fromDB,
      params: { date: clickedDate, user: user.email },
    }).then((response) => {
      // console.log('data', response.data);
      // console.log('공연리뷰', data[0][1]);
      setData(response.data);
      setModalShow(!modalShow);
    });
  };
  // const Div5 = styled.div`
  //   margin-left: 10px;
  // `;
  // const handleDayClick = (value, event) => {
  //   //console.log('target', moment(value).format('YYYY년 MM월 DD일'));
  //   axios({
  //     method: 'get',
  //     url: axiosurl.fromDBperfo,
  //     params: { date: moment(value).format('YYYY년 MM월 DD일') },
  //   }).then((re) => {
  //     console.log(re.data);
  //     if (re.data == null) {
  //       setModalShow(!modalShow);
  //     } else alert(re.data);
  //   });
  // };

  //마크가져오기

  useEffect(() => {
    if (user.userId) {
      axios({
        method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
        url: axiosurl.fromDBAll,
        params: { user: user.email },
      }).then((rep) => {
        console.log('------------');
        console.log(rep.data);
        //setMarks([rep.data]);
      });
    }
  }, [user]);

  const deletePerfo = () => {
    axios({
      method: 'delete',
      url: axiosurl.fromDB,
      params: { user: user.email },
    }).then((response) => {});
  };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // tileClassName={({ data }) =>
        //   marks.includes(data) ? 'highlight' : null
        // }

        tileClassName={({ date, view }) => {
          if (
            marks.find((x) => x === moment(date).format('YYYY년 MM월 DD일'))
          ) {
            return 'highlight';
          }
        }}
      />
      {modalShow && (
        <Pop show={modalShow} date={value} onHide={() => setModalShow(false)} />
      )}
      <div className="text-gray-500 mt-4">
        <Div5>
          <h4
            style={{
              backgroundColor: '    #96C7ED',
              borderRadius: '20px',
              width: '190px',
              height: '40px',
              textAlign: 'center',
              justifyContent: 'center',
              paddingTop: '5px',
            }}
          >
            {' '}
            그 날의 기록
          </h4>
          <h2
            style={{
              backgroundColor: '#FFC6C3',
              width: '190px',
              fontSize: '20px',
              borderRadius: '20px',
              height: '30px',
              fontWeight: '400',
              paddingLeft: '12px',
            }}
          >
            {moment(value).format('YYYY년 MM월 DD일')}
          </h2>
          <p> 날짜를 클릭하면 나의 기록을 볼 수 있습니다 '◡' </p>
          <span>
            <Modal
              show={selectPerformance !== null}
              onHide={handlePerformanceClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>기록 상세보기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* {console.log('selectPerformance', selectPerformance)} */}
                🎵 제목 :{' '}
                {selectPerformance !== null
                  ? selectPerformance.title !== null
                    ? selectPerformance.title
                    : ''
                  : ''}
                <br />
                🪩 극장 :
                {selectPerformance !== null
                  ? selectPerformance.hall !== null
                    ? selectPerformance.hall
                    : ''
                  : ''}
                <br />
                🎤 배우 :
                {selectPerformance !== null
                  ? selectPerformance.mainroll !== null
                    ? selectPerformance.mainroll
                    : ''
                  : ''}
                <br />
                💭 후기 :
                {selectPerformance !== null
                  ? selectPerformance.review !== null
                    ? selectPerformance.review
                    : ''
                  : ''}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePerformanceClose}>
                  Close
                </Button>

                <Button variant="primary" onClick={deletePerfo}>
                  delete
                </Button>
              </Modal.Footer>
            </Modal>
            {data.length > 0 ? (
              data[0].map((el, index) => {
                // console.log('el', el);
                return (
                  <div key={index}>
                    <h3> 🎼 공연 </h3>
                    제목 : {el.title}
                    <br /> 극장 : {el.hall}
                    {/* <Button variant="primary" onClick={handleShow}> */}
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectPerformance(el);
                      }}
                    >
                      상세보기
                    </Button>
                    <hr style={{ marginTop: '30px' }} />
                  </div>
                );
              })
            ) : (
              <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            )}
          </span>
          <span>
            <Modal show={selectBook !== null} onHide={handleBookClose}>
              <Modal.Header closeButton>
                <Modal.Title>기록 상세보기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                📚 제목 :{' '}
                {selectBook !== null
                  ? selectBook.title !== null
                    ? selectBook.title
                    : ''
                  : ''}
                <br />
                📝 저자 :{' '}
                {selectBook !== null
                  ? selectBook.author !== null
                    ? selectBook.author
                    : ''
                  : ''}
                <br />
                📖 장르 :{' '}
                {selectBook !== null
                  ? selectBook.genre !== null
                    ? selectBook.genre
                    : ''
                  : ''}
                <br />
                💭 후기 :{' '}
                {selectBook !== null
                  ? selectBook.review !== null
                    ? selectBook.review
                    : ''
                  : ''}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleBookClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
              </Modal.Footer>
            </Modal>
            {data.length > 0 ? (
              data[1].map((el, index) => {
                return (
                  <div key={index}>
                    <h3> 📚 책</h3>
                    제목 :{el.title}
                    <br />
                    저자: {el.author}
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectBook(el);
                      }}
                    >
                      상세보기
                    </Button>
                    <hr style={{ marginTop: '30px' }} />
                  </div>
                );
              })
            ) : (
              <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            )}
          </span>
          <span>
            <Modal show={selectMovie !== null} onHide={handleMovieClose}>
              <Modal.Header closeButton>
                <Modal.Title>기록 상세보기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                🎞️ 제목 :{' '}
                {selectMovie !== null
                  ? selectMovie.title !== null
                    ? selectMovie.title
                    : ''
                  : ''}
                <br />
                🎬 감독 :{' '}
                {selectMovie !== null
                  ? selectMovie.director !== null
                    ? selectMovie.director
                    : ''
                  : ''}
                <br />
                💃🏻 배우 :{' '}
                {selectMovie !== null
                  ? selectMovie.actor !== null
                    ? selectMovie.actor
                    : ''
                  : ''}{' '}
                <br />
                💭 후기 :{' '}
                {selectMovie !== null
                  ? selectMovie.review !== null
                    ? selectMovie.review
                    : ''
                  : ''}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleMovieClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleMovieClose}>Save Changes</Button> */}
              </Modal.Footer>
            </Modal>
            {data.length > 0 ? (
              data[2].map((el, index) => {
                return (
                  <div key={index}>
                    <h3> 🎬 영화</h3>
                    제목 : {el.title} <br />
                    감독 : {el.director}
                    <Button
                      variant="primary"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => {
                        setSelectMovie(el);
                      }}
                    >
                      상세보기
                    </Button>
                  </div>
                );
              })
            ) : (
              <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            )}
          </span>
        </Div5>
      </div>
    </div>
  );
}
