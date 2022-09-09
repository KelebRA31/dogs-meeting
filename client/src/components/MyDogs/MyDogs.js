import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogInfoTHUNK, setDogImgTHUNK } from '../../redux/actions/dogAction';
import { getUserInfoTHUNK, setUserImgTHUNK } from '../../redux/actions/userAction';
import './MyDogs.css';

export default function MyDogs() {
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

  return (
    <div>
      {dog?.map((el) => el.name)}
    </div>
  );
}
