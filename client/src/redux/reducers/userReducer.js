import {
  SET_USER_IMG,
} from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_IMG:
      return payload;

      // case SEARCH_USERS:
      //   return payload;

    default:
      return state;
  }
};
