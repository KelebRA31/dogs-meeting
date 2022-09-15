import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkAuthTHUNK } from '../../redux/actions/authAction';
import { deleteDogTHUNK, getDogInfoTHUNK, setDogImgTHUNK } from '../../redux/actions/dogAction';
import { getUserInfoTHUNK, setUserImgTHUNK } from '../../redux/actions/userAction';
import Dog from '../Dog/Dog';
import DogForm from '../DogForm/DogForm';
import './MyDogs.css';

export default function MyDogs() {
  const [avatar, setAvatar] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  // const { auth } = useSelector((state) => state);
  const dog = useSelector((state) => state.dog);
  const auth = useSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogInfoTHUNK(id));
  }, []);
  const deleteHandler = (dogId) => {
    dispatch(deleteDogTHUNK(dogId));
  };
  const editHandler = (dogId, setIsEdit) => {

  };

  return (
    <div className="container">
      {!auth?.notAuth && !isAdding && <button onClick={() => setIsAdding(true)} type="button" className="btn btn-primary">Добавить собаку</button>}
      <div className="room-container">
        {!auth?.notAuth && isAdding && <DogForm setIsAdding={setIsAdding} />}
        {auth?.notAuth && <h1>Нужно зарегистрироваться!</h1>}
        {dog?.map((el) => (
          <Dog
            key={el?.id}
            dog={el}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </div>

    </div>
  );
}
