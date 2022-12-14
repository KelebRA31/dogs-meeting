import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './DogForm.css';
import { useParams } from 'react-router-dom';
import { createDogTHUNK, setDogImgTHUNK } from '../../redux/actions/dogAction';

function DogForm({ setIsAdding }) {
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const { id } = useParams();
  const [input, setInput] = useState({
    name: '',
    gender_id: '',
    temper_id: '',
    breed: '',
    // img: '',
    age: '',
  });
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
          // dispatch(setDogImgTHUNK({ str: `/Images/${fileP[fileP.length - 1]}`, id }));
        });
    } catch (error) {
      console.error(error);
    }
  }, [img]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDogTHUNK({
      ...Object.fromEntries(new FormData(e.target)),
      user_id: id,
      img: avatar,
    }));
    setIsAdding(false);
  };
  return (
    <div className="container-form-mydogs">
      <div className="avatar">
        {avatar
          ? <img src={`${avatar}`} width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
          : <img src="/avatar-logo.png" width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />}
      </div>
      <div className="mb-3 photo-button-profile">
        <label htmlFor="formFileSm" className="form-label text-photo-profile label-dogform">Изменить фото</label>
        <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button type="button" className="btn btn-outline-warning button-profile" onClick={sendFile}>Выбрать фото</button>
      </div>
      <form className="form-dogform" onSubmit={submitHandler}>
        <div className="form-group">
          <label className="label-dogform" htmlFor="exampleInputEmail1">Имя собаки</label>
          <input name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <div className="input-DogForm">
          <label className="label-dogform" htmlFor="exampleInputEmail1">Возраст собаки</label>
          <input name="age" type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите возраст собаки" />
        </div>
        <div className="input-DogForm">
          <label className="label-dogform" htmlFor="exampleInputEmail1">Порода собаки</label>
          <input name="breed" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите породу собаки" />
        </div>
        <select name="gender_id" className="form-select" aria-label="Default select example">
          <option value="1">Самец</option>
          <option value="2">Самка</option>
        </select>
        <select name="temper_id" className="form-select" aria-label="Default select example">
          <option value="1">Активный</option>
          <option value="2">Нейтральный</option>
          <option value="3">Спокойный</option>
        </select>
        <button type="submit" className="btn btn-warning button-dogform">Добавить собаку</button>
      </form>
    </div>
  );
}

export default DogForm;
