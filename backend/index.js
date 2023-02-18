// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// dotenv.config();
const router = require('./routes/index');
// const cors = require('cors');

// let corsOption = {
//   origin: 'http://localhost:3000', // 허락하는 요청 주소
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   optionsSuccessStatus: 200, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
// };

// app.use(cors(corsOption));
// app.use('/public', express.static(__dirname + '/public'));
// app.use(express.json());
// app.use('/', router);

// app.get('*', (req, res) => {
//   res.send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
// });

// app.listen(5000, () => {
//   console.log('server port', 5000);
// });

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: { origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] },
});
const cors = require('cors');

let corsOption = {
  origin: 'http://localhost:3000', // 허락하는 요청 주소
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption));
const socket = require('./socketio/index');
const port = 5000;
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { auth } = require('./middleware/auth');

const { User } = require('./models/User');
const { Date } = require('./models/Date');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoose = require('mongoose');
const { Router } = require('express');
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('mongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/api/hello', (req, res) => {});

app.post('/api/users/register', (req, res) => {
  //회원가입을 할 때 필요한 정보들을 클라이언트에서 가져오면
  //그 정보들을 데이터 베이스에 넣어준다.
  // const user = new User(req.body);

  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.json({
        success: false,
        msg: '이미 존재하는 아이디입니다.',
      });
    } else {
      console.log(req.body);
      //몽고db
      const user = new User(req.body);
      user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
    }
  });
});

// app.post('/api/date', (req, res) => {
//   console.log('----');
//   console.log(req.body);
//   return res.status(200).json({
//     success: true,
//   });
// });

app.post('/api/users/login', async (req, res) => {
  //1. 데이터베이스에서 요청한 e-mail찾기
  //요청된 이메일을 데이터베이스에 있는지 찾는다
  //findOne -> mongodb method
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 아이디에 해당하는 유저가 없습니다.',
      });
    }
    //2. 데이터베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, async (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });

      //3. 비밀번호까지 같다면 token을 생성
      //비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다. 어디에? -> 쿠키, 로컬스토리지 등등..
        res.cookie('x_auth', user.token, { maxAge: 30000 }).status(200).json({
          loginSuccess: true,
          userId: user._id,
          permission: user.permission,
        });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    permission: req.user.permission,
    /*     role: req.user.role, */
  });
});

//logout
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.use('/', router);
app.get('*', (req, res) => {
  res.send('주소가 존재하지 않습니다. 다시 한 번 확인해주세요.');
});

// 소켓 객체 전달
socket(io);
// app.listen(port, () => console.log(`server port: ${port}!`));
http.listen(port, () => console.log(`server port: ${port}!`));
