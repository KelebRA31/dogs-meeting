// Example

import {
  SET_USER_IMG,
} from '../types/types';

export const setUserImg = (data) => ({ type: SET_USER_IMG, payload: data });
// export const searchUsers = (str) => ({ type: SEARCH_USERS, payload: str });

export const setUserImgTHUNK = (str) => (dispatch) => {
  fetch('http://localhost:3001/api/setuserimg', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(str),
  })
    .then((res) => res.json())
    .then((res) => dispatch(setUserImg(res)));
};
