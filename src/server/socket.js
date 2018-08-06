//To have in mind when a user connected the server response with a currentDisplay that is equals to player's id
//cause display == player.id
class Socket {

  constructor(io) {
    this.io = io;

    this.init();
  }

  init() {
    this.io.on('connection', socket => {
      console.log('user connected');

      socket.on('orientationChange', event => {
        this.io.emit('motionValues', event);
      });

      socket.on('ea', e => console.log("eso ",e));
      //Handle when a user disconnects
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

    });

  }

}

module.exports = Socket;
