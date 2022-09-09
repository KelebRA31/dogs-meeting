import React, { useCallback, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserImgTHUNK } from '../../redux/actions/userAction';

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      await axios.post('api/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then((res) => {
          const resPath = res.data.path;
          const fileP = resPath.split('/');
          console.log(resPath.split('/'));
          console.log(fileP[fileP.length - 1]);
          // console.log(`Images/${resPath[resPath.length - 1]}`);
          setAvatar(`Images/${fileP[fileP.length - 1]}`);
          dispatch(setUserImgTHUNK({ str: `Images/${fileP[fileP.length - 1]}` }));
        });
    } catch (error) {
      console.error(error);
    }
  }, [img]);

  return (
    <div>
      <div className="avatar">
        {avatar
          ? <img src={`${avatar}`} alt="avatar" />
          : <img src="avatar-logo.png" alt="avatar" />}
      </div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button type="button" className="avatar-button" onClick={sendFile}>Изменить аватар</button>
    </div>
  );
}
