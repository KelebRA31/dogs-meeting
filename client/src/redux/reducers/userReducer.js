import {
  SET_USER_IMG, GET_USER_INFO,
} from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_IMG:
      return payload;
    case GET_USER_INFO:
      return payload;

    default:
      return state;
  }
};
