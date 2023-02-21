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

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);

  const [data, setData] = useState([]);

  //타이틀 눌렀을 때 누른 게시글 보게끔
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [marks, setMarks] = useState([]);

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

  const Div5 = styled.div`
    margin-left: 10px;
  `;

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

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // tileClassName={({ date }) =>
        //   marks.includes(moment(date).format('DD-MM-YYYY')) ? 'highlight' : null
        // }

        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
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
              backgroundColor: '	#96C7ED',
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
            {data.length > 0 ? (
              data[0].map((el) => {
                return (
                  <p>
                    <h3> 🎼 공연 </h3>
                    제목 : {el.title}
                    <br /> 극장 : {el.hall}
                    <Button variant="primary" onClick={handleShow}>
                      상세보기
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>기록 상세보기</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        🎵 제목 : {el.title} <br />
                        🪩 극장 : {el.author} <br />
                        🎤 배우 : {el.mainroll} <br />
                        💭 후기 : {el.review}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <hr style={{ marginTop: '30px' }} />
                  </p>
                );
              })
            ) : (
              <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            )}
          </span>

          <span>
            {data.length > 0 ? (
              data[1].map((el) => {
                return (
                  <>
                    <h3> 📚 책</h3>
                    제목 :{el.title}
                    <br />
                    저자: {el.author}
                    <Button variant="primary" onClick={handleShow}>
                      상세보기
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>기록 상세보기</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        📚 제목 : {el.title} <br />
                        📝 저자 : {el.author} <br />
                        📖 장르 : {el.genre} <br />
                        💭 후기 : {el.review}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <hr style={{ marginTop: '30px' }} />
                  </>
                );

                // (
                //   <p>
                //     {' '}
                //     <h3>책</h3>
                //     제목 : {el.title} <br /> 저자 : {el.author}
                //     <hr style={{ marginTop: '30px' }} />
                //   </p>
                // );
              })
            ) : (
              <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            )}
          </span>

          <span>
            {data.length > 0 ? (
              data[2].map((el) => {
                return (
                  <p>
                    <h3> 🎬 영화</h3>
                    제목 : {el.title} <br />
                    감독 : {el.director}
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      style={{ marginLeft: 'auto' }}
                    >
                      상세보기
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>기록 상세보기</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        🎞️ 제목 : {el.title} <br />
                        🎬 감독 : {el.director} <br />
                        💃🏻 배우 : {el.actor} <br />
                        💭 후기 : {el.review}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </p>
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
