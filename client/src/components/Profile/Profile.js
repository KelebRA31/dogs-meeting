/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  editUserInfoTHUNK, getUserInfo, getUserInfoTHUNK, setUserImgTHUNK,
} from '../../redux/actions/userAction';

export default function Profile({
  avatar, setAvatar, isEdit, setIsEdit,
}) {
  const { user1 } = useSelector((state) => state);
  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    name: '',
    gender: '',
    age: '',
  });
  const dispatch = useDispatch();
  // const { auth } = useSelector((state) => state);

  const { id } = useParams();

  // Отрисовка инфо о юзере

  useEffect(() => {
    dispatch(getUserInfoTHUNK(id));
    setInput({
      name: user1.name,
      gender: user1.Gender?.gender === 'male' ? 'Мужчина' : 'Женщина',
      age: user1.age ? user1.age : '',
    });
    setAvatar(user1.img);
  }, [user1.img]);

  // Редактирование Фото

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
          dispatch(setUserImgTHUNK({ str: `/Images/${fileP[fileP.length - 1]}`, id }));
        });
    } catch (error) {
      console.error(error);
    }
  }, [img]);

  // Редактирование

  const changeStatusEdit = () => {
    setIsEdit(!isEdit);
  };

  const changeInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const editUserInfoHandler = (e) => {
    // console.log(input);
    e.preventDefault();
    // console.log('--->', Object.fromEntries(new FormData(e.target)).gender);
    dispatch(editUserInfoTHUNK(id, input, Object.fromEntries(new FormData(e.target)).gender));
    setIsEdit(!isEdit);
  };

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
        <form className="form-profile" onSubmit={editUserInfoHandler}>
          {' '}
          <h5 className="line-profile">
            <div className="text-profile">
              Имя
            </div>
            {isEdit === true ? <input value={input.name} onChange={changeInput} name="name" /> : user1.name}
          </h5>
          <h5 className="line-profile">
            <div className="text-profile">
              Пол
            </div>
            {isEdit === true ? (
              <>
                <p className="label-txt">Выберите пол</p>
                <select name="gender" className="form-select" value={input.gender} onChange={changeInput} aria-label="Default select example">
                  <option value="1">Мужчина</option>
                  <option value="2">Женщина</option>
                </select>
              </>
            )
              : user1.gender_id === 1
                ? 'Мужчина'
                : 'Женщина' }
          </h5>
          <h5 className="line-profile">
            <div className="text-profile">
              Возраст
            </div>
            {isEdit === true ? <input type="number" value={input.age} onChange={changeInput} name="age" />
              : user1.age
                ? user1.age
                : 'Возраст не заполнен'}
          </h5>
          {!isEdit ? <button type="button" className="btn btn-outline-warning button-profile" onClick={changeStatusEdit}>Редактировать данные</button>
            : (
              <div>
                <button type="button" className="btn btn-outline-warning button-profile" onClick={changeStatusEdit}>Редактировать данные</button>
                <button type="submit" className="btn btn-outline-warning button-profile">Сохранить изменения</button>
              </div>
            )}
        </form>
      </div>
    </div>
  );
}
