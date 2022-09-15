import {
  ADD_USER_EVENT,
} from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER_EVENT:
      return [...state, payload];

    default:
      return state;
  }
};
