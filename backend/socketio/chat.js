const mongoose = require('mongoose');
const { ChatRoom, Chat } = require('../models/Chat');
// const config = require('../config/key');

// mongoose
//   .connect(config.mongoURI, {})
//   .then(() => console.log('mongoDB Connected...'))
//   .catch((err) => console.log(err));

exports.roomSave = async (roomId, socketId, userId) => {
  try {
    // console.log('roomSave roomId', roomId);
    // console.log('roomSave roomId', socketId);
    // console.log('roomSave roomId', userId);
    const data = {
      roomId: roomId,
      clientSocketId: socketId,
      clientUserId: userId,
    };
    const chatRoom = new ChatRoom(data);
    // await chatRoom.save();
    const result = await chatRoom.save();
    // console.log('roomSave result', result);
    return result;
  } catch (err) {
    console.log('roomSave err', err);
  }
};

exports.messageSave = async (data) => {
  try {
    // console.log('messageSave data', data);

    // findById는 조건에 해당하는 id만 찾아준다.
    // const chatRoom = await ChatRoom.findById(data.socketId);

    const chat = new Chat(data);
    const result = await chat.save();
    // console.log('messageSave result', result);
    return result;
  } catch (err) {
    console.log('messageSave err', err);
  }
};

// 특정 컬렉션의 데이터 전부 삭제
// db.chatrooms.deleteMany({});

exports.roomListCall = async (myRoomId) => {
  try {
    let resultRoomList = [];
    // 해당 데이터 제외하고 조회 (Not)
    // { roomId: { $ne: myRoomId } }
    const result = await ChatRoom.find({ roomId: { $ne: myRoomId } });
    console.log('roomListCall result', result);

    result.forEach(async (el) => {});

    return result;
  } catch (err) {
    console.log('roomListCall err', err);
  }
};

// exports.fromDBperfo = async (req, res) => {
//   console.log('fromperfo', req.query);
//   const findDate = await Performance.findOne({ date: req.query.date });
//   console.log('finddate', findDate);
//   res.send(findDate);
// };
