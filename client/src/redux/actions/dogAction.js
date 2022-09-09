// Example

import {
  SET_DOG_IMG, GET_DOG_INFO,
} from '../types/types';

export const setDogImg = (data) => ({ type: SET_DOG_IMG, payload: data });
export const getDogInfo = (data) => ({ type: GET_DOG_INFO, payload: data });

export const setDogImgTHUNK = (str) => (dispatch) => {
  fetch('http://localhost:3001/api/setdogimg', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(str),
  })
    .then((res) => res.json())
    .then((res) => dispatch(setDogImg(res)));
};

export const getDogInfoTHUNK = (id) => (dispatch) => {
  fetch(`http://localhost:3001/mydogs/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch(getDogInfo(res)));
};
