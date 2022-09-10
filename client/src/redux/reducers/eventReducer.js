import { CREATE_EVENT } from '../types/types';

export default (state = { eventData: null, loading: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EVENT:
      return { ...state, eventData: payload, loading: false };

    case 'FETCH_EVENT':
      return { ...state, loading: true };

    default:
      return state;
  }
};
