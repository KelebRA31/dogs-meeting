import {
  SET_DOG_IMG, GET_DOG_INFO, CREATE_DOG, DELETE_DOG, EDIT_DOG,
} from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DOG_IMG:
      return payload;
    case GET_DOG_INFO:
      return payload;
    case CREATE_DOG:
      return [...state, payload];
    case DELETE_DOG:
      return state.filter((el) => el.id !== payload);
    case EDIT_DOG:
      return [...state.filter((el) => el.id !== payload.id), payload].sort((a, b) => a.id - b.id);

    default:
      return state;
  }
};
