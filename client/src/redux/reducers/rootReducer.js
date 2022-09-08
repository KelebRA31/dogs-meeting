import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({

  //   loading: loadingReducer,
  //   users: usersReducer,
  auth: authReducer,

});

export default rootReducer;
