/* eslint-disable no-sequences */
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
import Pop from './Pop';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosurl from '../axiosurl';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { dateData } from '../actions/date_action';
import { Toast } from 'react-bootstrap';

const Div5 = styled.div`
  margin-left: 10px;
`;

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectPerformance, setSelectPerformance] = useState(null);
  const handlePerformanceClose = () => setSelectPerformance(null);
  const [selectBook, setSelectBook] = useState(null);
  const handleBookClose = () => setSelectBook(null);
  const [selectMovie, setSelectMovie] = useState(null);
  const handleMovieClose = () => setSelectMovie(null);
  const [marks, setMarks] = useState([]);
  const [markData, setMarkData] = useState();
  // const [marks, setMarks] = useState(['2023년 02월 21일']);

  // 클라이언트에서 marks 배열을 유지하기 위해서는, useState 훅을 이용하여 marks 배열을 상태값으로 유지
  // useEffect(() => {
  //   axios.get('/data').then((response) => {});
  // }, []);
  // axios({ method: 'get', url: 'axiosurl.fromDBperfo', timeout: 5000 })
  //   .then((response) => {
  //     const data = response.data.data;
  //     const marks = response.data.marks;
  //     setData(data);
  //     setMarks(marks);
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   });

  // // 하이라이트 표시를 위한 배열
  const fromDBdate = () => {};
  const dispatch = useDispatch();
  const P = useSelector((state) => state.date.date);
  // const marks = [{ P }];
  //const marks = [moment(P).format('DD-MM-YYYY')];
  //const marks = data.map((item) => new Date(item.date));
  // console.log('내가선택한날짜', value); // 내가 선택한 날짜
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

  const allReview = () => {
    alert(data[2][0].review);
    console.log(data[2][0]);
  };
  //그치만 alert로 띄우면 삭제가 안되니까 다른 방식으로 해야한다.
  //지금은 각 값이 들어오는지만 확인을 하였다. 몇 번째 배열의 값을 누를 지 모르기때문에 그에 따라 값을 가져와야함.
  //서버에서는 데이터가 있는 경우에는 해당 데이터를 JSON 형태로 응답하고, 데이터가 없는 경우에는 빈 JSON 객체 {}를 응답
  // 날짜 클릭 이벤트핸들러

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

  // 마크가져오기
  useEffect(() => {
    if (user.userId) {
      axios({
        method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
        url: axiosurl.fromDBAll,
        params: { user: user.email },
      }).then((rep) => {
        // console.log('------------');
        console.log('rep.data', rep.data);
        setMarks(Object.keys(rep.data));
        setMarkData(rep.data);
      });
    }
  }, [user]);

  const deletePerfo = (e) => {
    console.log(e);
    axios({
      method: 'delete',
      url: axiosurl.DBdelete,
      params: { _id: e },
    })
      .then((response) => {
        console.log('성공');
      })
      .catch(() => {
        console.log('실패');
      });
  };
  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // 날짜 및 데이터 여부 체크
        // return되는 클래스 이름이 button에 들어감
        tileClassName={({ date, view }) => {
          let temp = '';
          const tempData = marks.find(
            (x) => x === moment(date).format('YYYY년 MM월 DD일')
          );
          // console.log('tempData', tempData);
          if (tempData) {
            temp += 'highlight ';
            if (markData[tempData].book) {
              // console.log('mark book');
              temp += 'highlightBook ';
            }
            if (markData[tempData].movie) {
              // console.log('mark movie');
              temp += 'highlightMovie ';
            }
            if (markData[tempData].perfo) {
              // console.log('mark perfo');
              temp += 'highlightPerfo ';
            }
            return temp;
            // return 'highlight';
          }
        }}
        // 점으로 표시되는 기능
        tileContent={({ date, view }) => {
          let temp = [];
          const tempDotData = marks.find(
            (x) => x === moment(date).format('YYYY년 MM월 DD일')
          );
          // console.log('tempDotData', tempDotData);
          if (tempDotData) {
            if (markData[tempDotData].book) {
              temp.push(<div className="dot dotBook" key={'dotBook'}></div>);
            }
            if (markData[tempDotData].movie) {
              temp.push(<div className="dot dotMovie" key={'dotMovie'}></div>);
            }
            if (markData[tempDotData].perfo) {
              temp.push(<div className="dot dotPerfo" key={'dotPerfo'}></div>);
            }
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {temp}
                </div>
              </>
            );
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

                <Button
                  variant="primary"
                  onClick={deletePerfo(selectPerformance)}
                >
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
