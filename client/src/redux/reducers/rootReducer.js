import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dogReducer from './dogReducer';
import userReducer from './userReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({

  //   loading: loadingReducer,
  user: userReducer,
  auth: authReducer,
  dog: dogReducer,
  event: eventReducer,
});

export default rootReducer;
