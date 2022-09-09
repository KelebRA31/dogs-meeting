import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dogReducer from './dogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({

  //   loading: loadingReducer,
  user: userReducer,
  auth: authReducer,
  dog: dogReducer,
});

export default rootReducer;
