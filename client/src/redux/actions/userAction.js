// Example

import {
  SET_USER_IMG, GET_USER_INFO, EDIT_USER_INFO,
} from '../types/types';

export const setUserImg = (data) => ({ type: SET_USER_IMG, payload: data });
export const getUserInfo = (data) => ({ type: GET_USER_INFO, payload: data });
export const editUserInfo = (data) => ({ type: EDIT_USER_INFO, payload: data });

export const setUserImgTHUNK = (str) => (dispatch) => {
  fetch('http://localhost:3001/api/setuserimg', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(str),
  })
    .then((res) => res.json())
    .then((res) => dispatch(setUserImg(res)));
};

export const getUserInfoTHUNK = (id) => (dispatch) => {
  fetch(`http://localhost:3001/profile/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch(getUserInfo(res)));
};

export const editUserInfoTHUNK = (id, obj) => (dispatch) => {
  console.log('11111111111111', obj);
  fetch(`http://localhost:3001/api/profilechange/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        dispatch(editUserInfo(res));
      }
    });
};
