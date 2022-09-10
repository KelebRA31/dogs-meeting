import React, { useCallback, useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserInfo, getUserInfoTHUNK, setUserImgTHUNK } from '../../redux/actions/userAction';

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  // const { auth } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserInfoTHUNK(id));
  }, []);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      await axios.post('/api/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then((res) => {
          const resPath = res.data.path;
          const fileP = resPath.split('/');
          setAvatar(`/Images/${fileP[fileP.length - 1]}`);
          dispatch(setUserImgTHUNK({ str: `/Images/${fileP[fileP.length - 1]}` }));
        });
    } catch (error) {
      console.error(error);
    }
  }, [img]);

  return (
    <div>
      <div className="container-profile">
        <div className="avatar">
          {avatar
            ? <img src={`${avatar}`} width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
            : <img src="/avatar-logo.png" width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />}
        </div>
        <div className="mb-3 photo-button-profile">
          <label htmlFor="formFileSm" className="form-label text-photo-profile">Изменить фото</label>
          <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(e) => setImg(e.target.files[0])} />
          <button type="button" className="btn btn-outline-warning button-profile" onClick={sendFile}>Изменить аватар</button>
        </div>
        {/* <input type="file" onChange={(e) => setImg(e.target.files[0])} /> */}
        <form className="form-profile">
          {' '}
          <h5 className="line-profile">
            <div className="text-profile">
              Имя

            </div>

            {user.name}
          </h5>
          <h5 className="line-profile">
            <div className="text-profile">
              Пол
            </div>
            {user.Gender?.gender === 'male' ? 'Мужчина' : 'Женщина'}
          </h5>
          <h5 className="line-profile">
            <div className="text-profile">
              Возраст
            </div>
            {user.age ? user.age : 'Возраст не заполнен'}
          </h5>
          <button type="button" className="btn btn-outline-warning button-profile">Редактировать данные</button>
        </form>
      </div>
    </div>
  );
}
