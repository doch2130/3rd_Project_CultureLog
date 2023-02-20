const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = mongoose.Schema({
  roomId: {
    type: String,
    unique: 1, // 중복 방지
    required: true,
  },
  clientSocketId: {
    type: String,
    required: true,
  },
  clientUserId: {
    type: String,
  },
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

const chatSchema = mongoose.Schema({
  ChatRoom_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
  },
  roomId: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: 'default',
  },
  time: {
    type: String,
    default: 'default',
  },
  socketId: {
    type: String,
    default: 'default',
  },
  userId: {
    type: String,
    default: 'default',
  },
});

const Chat = mongoose.model('Chats', chatSchema);
module.exports = { ChatRoom, Chat };
