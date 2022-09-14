import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dogReducer from './dogReducer';
import eventReducer from './eventReducer';
import wsReducer from './wsReducer';
import chatUserReducer from './chatUsersReducer';
import chatMessageReducer from './chatMessageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({

  //   loading: loadingReducer,
  auth: authReducer,
  dog: dogReducer,
  event: eventReducer,
  user: userReducer,
  ws: wsReducer,
  chatUsers: chatUserReducer,
  messages: chatMessageReducer,
});

export default rootReducer;
