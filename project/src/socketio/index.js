export default function socketIO(socketIO) {
  const socket = socketIO.connect('http://localhost:5000');
  socket.emit('send_message', { message: 'Hello' });
  socket.on('welceome', (msg) => {
    // console.log(msg);
  });
}
