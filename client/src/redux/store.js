import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';

export default configureStore({
  reducer: rootReducer,
});
