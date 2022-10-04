/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthTHUNK, setAuthTHUNK } from '../../redux/actions/authAction';
import '../Registration/Registration.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [badAuth, setBadAuth] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(checkAuthTHUNK());
  }, []);

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(typeof (Number(Object.fromEntries(new FormData(e.target)).gender_id)));
    // const gender_id = Object.fromEntries(new FormData(e.target)).gender_id * 1;
    // console.log(gender_id);
    // setInputs((prev) => ({
    //   ...prev,
    //   gender_id: g,
    // }));
    // console.log(inputs);
    // dispatch(setRegistrationTHUNK(inputs, gender_id));
    dispatch(setAuthTHUNK(inputs));
    dispatch(checkAuthTHUNK());
    console.log(auth);
    // console.log(data);
    if (!auth) {
      setBadAuth(true);
    } else {
      setBadAuth(false);
    }
  };
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  return (
    <div className="container register-form">
      <div className="form">
        <form onSubmit={submitHandler}>
          <h1>Вход</h1>
          {/* {badAuth && <h2 style={{ color: '#bf1650' }}>Email или пароль неверны</h2>} */}
          <label htmlFor="usr">
            <p className="label-txt">Введите свой email</p>
            <input onChange={inputHandler} value={inputs.email} name="email" className="input" id="usr" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой пароль</p>
            <input
              onChange={inputHandler}
              value={inputs.password}
              className="input"
              type="password"
              name="password"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <button type="submit" className="btn btn-success btn-lg" style={{ width: '15rem', marginTop: '30px' }}>Войти</button>
        </form>
      </div>
    </div>
  );
}
