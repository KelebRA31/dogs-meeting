import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { editDogTHUNK } from '../../redux/actions/dogAction';
import './Dog.css';

function Dog({ dog, deleteHandler, editHandler }) {
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState(dog.img);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const { id } = useParams();
  const [input, setInput] = useState({
    name: dog.name,
    gender_id: dog.gender_id,
    temper_id: dog.temper_id,
    breed: dog.breed,
    // img: '',
    age: dog.age,
  });
  const changeInput = (e) => {
    setInput(e.target.value);
  };
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

    dispatch(editDogTHUNK(dog.id, {
      ...Object.fromEntries(new FormData(e.target)),
      user_id: id,
      img: avatar,
    }));
    // dispatch(createDogTHUNK({
    //   ...Object.fromEntries(new FormData(e.target)),
    //   user_id: id,
    //   img: avatar,
    // }));
    // setIsAdding(false);
    setIsEdit(false);
  };
  return (
    <div className="super-dog-container">
      <div className="dog-container">
        {isEdit ? (
          <div className="mini-dog-container">
            <div>
              <div className="avatar-mydogs">
                {avatar
                  ? <img src={`${avatar}`} width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
                  : <img src="/avatar-logo.png" width="120px" height="120px" style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />}
              </div>
              <div className="mb-3 photo-button-profile">
                <label htmlFor="formFileSm" className="form-label text-photo-profile label-mydogs">Изменить фото</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(e) => setImg(e.target.files[0])} />
                <button type="button" className="btn btn-outline-warning button-profile" onClick={sendFile}>Выбрать фото</button>
              </div>
              <form className="form-dog" onSubmit={submitHandler}>
                <div className="form-group">
                  <label className="label-mydogs" htmlFor="exampleInputEmail1">Имя собаки</label>
                  <input value={input.name} onChange={changeInput} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
                </div>
                <div className="form-group">
                  <label className="label-mydogs" htmlFor="exampleInputEmail1">Возраст собаки</label>
                  <input value={input.age} onChange={changeInput} name="age" type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите возраст собаки" />
                </div>
                <div className="form-group">
                  <label className="label-mydogs" htmlFor="exampleInputEmail1">Порода собаки</label>
                  <input value={input.breed} onChange={changeInput} name="breed" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите породу собаки" />
                </div>
                <select value={input.gender_id} name="gender_id" className="form-select" aria-label="Default select example">
                  <option value="1">Самец</option>
                  <option value="2">Самка</option>
                </select>
                <select value={input.temper_id} name="temper_id" className="form-select" aria-label="Default select example">
                  <option value="1">Активный</option>
                  <option value="2">Нейтральный</option>
                  <option value="3">Спокойный</option>
                </select>
                <button type="submit" className="btn btn-warning">Сохранить</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="dog-container">
            <img src={dog.img} className="img-onedog" alt="dogPhoto" height="" />
            <div className="key-value-mydogs">
              <div className="mini-key-value-mydogs">
                <div className="key-mydogs">
                  Кличка:
                </div>
                <div className="value-mydogs">
                  {dog.name}
                </div>
              </div>
              <div className="mini-key-value-mydogs">
                <div className="key-mydogs">
                  Порода:
                </div>
                <div className="value-mydogs">
                  {dog.breed ?? 'Не указано'}
                </div>
              </div>
              <div className="mini-key-value-mydogs">
                <div className="key-mydogs">
                  Возраст:
                </div>
                <div className="value-mydogs">
                  {dog.age ?? 'Не указано'}
                </div>
              </div>
              <div id="buttons">
                <button onClick={() => setIsEdit(true)} type="button" className="btn btn-warning">Редактировать</button>
                <button onClick={() => deleteHandler(dog.id)} type="button" className="btn btn-danger">Удалить</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dog;
