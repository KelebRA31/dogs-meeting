/* eslint-disable linebreak-style */
import { ADD_CHAT_USER, GET_CHAT_MESSAGES, SET_CHAT_MESSAGE } from '../types/types';

export const chatUserAction = (payload) => ({
  type: ADD_CHAT_USER,
  payload,
});

export const getChatMessages = (payload) => ({
  type: GET_CHAT_MESSAGES,
  payload,
});

export const sendChatMessage = (payload) => ({
  type: SET_CHAT_MESSAGE,
  payload,
});
