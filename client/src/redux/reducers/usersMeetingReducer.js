import {
  ADD_USER_EVENT, GET_USER_EVENT,
} from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER_EVENT:
      return [...state, payload];
    case GET_USER_EVENT:
      return payload;

    default:
      return state;
  }
};
