import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

function App() {
  // axios 기본 url 설정
  // 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
  axios.defaults.baseURL = 'http://127.0.0.1:5500';
  // true로 설정해야 refreshToken cookie를 주고 받을 수 있다.
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
