
const app = require('express')();

const PORT = process.env.PORT || 3000;

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
		res.sendFile(__dirname + '/src/home.html')
});

app.get('/about', (req, res) => {
		res.sendFile(__dirname + '/src/about.html')
});

app.get('/chat', (req, res) => {
		res.sendFile(__dirname + '/src/chat.html')
});

app.get('/src/style.css', (req, res) => {
		res.sendFile(__dirname + '/src/style.css')
});

app.get('/src/chat.js', (req, res) => {
		res.sendFile(__dirname + '/src/chat.js')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
    console.log('server had been started...')
});

