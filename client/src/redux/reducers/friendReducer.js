import {
  ADD_FRIEND, DEL_FRIEND, GET_FRIEND,
} from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIEND:
      return payload;
    case ADD_FRIEND:
      return [...state, payload];
    case DEL_FRIEND:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};
