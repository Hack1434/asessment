const crypto = require('crypto');
const io = require('socket.io');


function generateDataStream() {
  const messages = [];
  for (let i = 0; i < Math.floor(Math.random() * 450) + 50; i++) {
    
    const message = {
      name: data.names[Math.floor(Math.random() * data.names.length)],
      origin: data.origins[Math.floor(Math.random() * data.origins.length)],
      destination: data.destinations[Math.floor(Math.random() * data.destinations.length)],
    };

    
    const secretKey = crypto.createHash('sha256').update(JSON.stringify(message)).digest('hex');

    // Encrypt the message payload using AES-256-CTR with the secret key
    const encryptedMessage = crypto.createCipheriv('aes-256-ctr', secretKey, crypto.randomBytes(16)).update(JSON.stringify(message)).final();

    
    messages.push(encryptedMessage.toString('hex'));
  }

  return messages.join('|');
}


const server = io();

// Listen for incoming connections
server.on('connection', (socket) => {
 
  setInterval(() => {
    socket.emit('dataStream', generateDataStream());
  }, 10000);
});

// Start the Socket.IO server
server.listen(3000);

