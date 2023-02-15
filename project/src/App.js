import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import NotFound from './components/NotFound';
import Join from './components/Join/Join';
import Start from './pages/Start';
import { Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import Movie from './components/Movie';
import Performance from './components/Performance';
import io from 'socket.io-client';
import socketIO from './socketio/index';
import './App.css';

function App() {
  socketIO(io);
  // axios 기본 url 설정
  // 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
  // axios.defaults.baseURL = 'http://127.0.0.1:5500';
  // true로 설정해야 Server와 Cookie를 주고 받을 수 있다.
  // axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Movie" element={<Movie />} />
        <Route path="/Performance" element={<Performance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
