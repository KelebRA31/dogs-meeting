const { WebSocketServer } = require('ws');
const { Message, User } = require('../db/models');

// WS we create a socket connection
// clientTracking - list of users in on ws
// noServer - if we don't need a ws server on different server
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

// WS listen to connection open event
wss.on('connection', (ws, request, wsMap) => {
  const { id, name } = request.session.user;

  // WS map of users
  wsMap.set(id, { ws, user: request.session.user });

  // WS send a message to all users
  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(JSON.stringify(
      { type: 'ADD_CHAT_USER', payload: Array.from(wsMap.values()).map((el) => el.user) },
    ));
  }

  // WS listen to message event
  ws.on('message', async (message) => {
    const { type, payload } = JSON.parse(message);

    switch (type) {
      case 'SET_CHAT_MESSAGE':
        const message = await Message.create({ user_id: id, text: payload.message, meeting_id: payload.meeting_id });
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({
            type: 'ADD_CHAT_MESSAGE',
            payload: {
              name, id, message: message.text, msId: message.id,
            },
          }));
        }
        break;
      case 'GET_CHAT_MESSAGES':
        const messages = await Message.findAll({ include: User });
        const data = JSON.parse(JSON.stringify(messages)).map((el) => ({
          name: el.User.name,
          id: el.User.id,
          message: el.text,
          msId: el.id,
        }));
        ws.send(JSON.stringify({
          type: 'ADD_CHAT_MESSAGES',
          payload: data,
        }));

        break;

      default:
        break;
    }
  });

  // WS listen to close event
  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(JSON.stringify(
        { type: 'ADD_CHAT_USER', payload: Array.from(wsMap.values()).map((el) => el.user) },
      ));
    }
  });
});

module.exports = wss;
