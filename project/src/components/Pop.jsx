import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateData } from '../actions/date_action';
import { DATE } from '../actions/types';

function Pop(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(props.date);
  const moveToBook = () => {
    dispatch(dateData(props.date));
    navigate('/Book');
  };

  const moveToMovie = () => {
    console.log(props.date);
    dispatch(dateData(props.date));
    navigate('/Movie');
  };

  const moveToPer = () => {
    navigate('/Performance');
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          기록 남기기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ justifyContent: 'center', textAlign: 'center' }}>
          기록하고 싶은 문화 선택 시 작성페이지로 이동합니다.
        </h5>
        <br />
        <div
          style={{
            justifyContent: 'space-evenly',
            display: 'flex',
          }}
        >
          <Button variant="outline-warning" size="lg" onClick={moveToMovie}>
            영화
          </Button>
          <Button variant="outline-primary" size="lg" onClick={moveToBook}>
            책
          </Button>
          <Button variant="outline-danger" size="lg" onClick={moveToPer}>
            공연
          </Button>
          {/* <span>{date}d</span> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Pop;
