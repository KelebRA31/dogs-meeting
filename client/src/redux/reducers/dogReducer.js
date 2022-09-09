import {
  SET_DOG_IMG, GET_DOG_INFO,
} from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DOG_IMG:
      return payload;
    case GET_DOG_INFO:
      return payload;

    default:
      return state;
  }
};
