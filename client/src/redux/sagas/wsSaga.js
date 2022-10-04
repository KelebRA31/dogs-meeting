import {
  take, put, call, fork, takeLatest, takeEvery,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { GET_CHAT_MESSAGES, SET_CHAT_MESSAGE, SET_WS } from '../types/types';

function createSocketChannel(socket, action) {
  // ws5 we listen to channel
  return eventChannel((emit) => {
    // ws6 four types of events
    socket.onopen = () => {
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    // ws7 if we need to close the socket
    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  console.log('Connection open');
  return new WebSocket(process.env.REACT_APP_WSURL);
}

function* userMessage(socket) {
  // ws9 sends message to server via socket
  // if action is dispatched
  while (true) {
    const message = yield take(SET_CHAT_MESSAGE);
    console.log('mess---->>', message);
    socket.send(JSON.stringify(message));
  }
}

function* getUserMessages(socket) {
  while (true) {
    const message = yield take(GET_CHAT_MESSAGES);
    console.log('GET_CHAT_MESSAGES', GET_CHAT_MESSAGES, message);
    socket.send(JSON.stringify(message));
  }
}

function* chatWatcher(action) {
  // ws3 magic http to ws request
  const socket = yield call(createWebSocketConnection);
  // ws4 more magic create detached event listener
  const socketChannel = yield call(createSocketChannel, socket, action);

  // ws8 creates non blocking event listeners
  // example doesn't delay msg receiving first you'll get text and after a large image
  yield fork(userMessage, socket);
  yield fork(getUserMessages, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocket() {
  // ws2 create ws chatWatcher
  yield takeEvery('SOCKET_INIT', chatWatcher);
}
