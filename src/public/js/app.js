const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('connection established!! ✨');
});

socket.addEventListener('message', (message) => {
  console.log('just received', message.data, 'from server');
});

socket.addEventListener('close', () => {
  console.log('close connection ❌');
});
