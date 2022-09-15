import {
  CREATE_EVENT, EVENT_FILTER, GET_EVENT, GET_CREATED_EVENTS, DEL_EVENT,
} from '../types/types';

export default (state = { eventData: [], loading: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENT:
      return { eventData: payload, loading: false };

    case GET_CREATED_EVENTS:
      return { eventData: payload, loading: false };

    case CREATE_EVENT:
      return { eventData: [...state.eventData, payload], loading: false };

    case EVENT_FILTER:
      return { ...state, eventData: state.eventData.filter((el) => el.id !== payload) };

    case DEL_EVENT:
      return state.eventData.filter((el) => el.id !== payload.id);

    case 'FETCH_EVENT':
      return { ...state, loading: true };

    default:
      return state;
  }
};
