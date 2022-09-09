import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogInfoTHUNK, setDogImgTHUNK } from '../../redux/actions/dogAction';
import { getUserInfoTHUNK, setUserImgTHUNK } from '../../redux/actions/userAction';
import './OneDog.css';

export default function OneDog() {
  const [avatar, setAvatar] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  // const { auth } = useSelector((state) => state);
  const { dog } = useSelector((state) => state);
  console.log(dog);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogInfoTHUNK(id));
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
          dispatch(setDogImgTHUNK({ str: `/Images/${fileP[fileP.length - 1]}` }));
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
        <h5 className="name-profile">
          <div>
            Имя:

          </div>

          {dog.name}
        </h5>
        <h5>
          Пол:
          {' '}
          {dog.Gender?.gender}
        </h5>
        <h5>
          Возраст:
          {' '}
          {dog.age ? dog.age : 'Возраст не заполнен'}
        </h5>
      </div>
    </div>
  );
}
