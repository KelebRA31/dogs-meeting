/* eslint-disable default-case */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthTHUNK, setRegistrationTHUNK } from '../../redux/actions/authAction';
import authReducer from '../../redux/reducers/authReducer';
import validPassword from '../../utils/validPassword';
import './Registration.css';

export default function Registration() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    nickName: '',
    checkPas: '',
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    nickName: false,
    checkPas: false,
  });
  const [error, setError] = useState({
    email: 'Email не может быть пустым',
    password: 'Пароль не может быть пустым',
    nickName: 'nickName не может быть пустым',
    checkPas: 'Пароли не совпадают',
  });

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length > 0) {
      setError((prev) => ({ ...prev, [e.target.name]: '' }));
    } else {
      setError((prev) => ({ ...prev, [e.target.name]: 'Поле не может быть пустым' }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(typeof (Number(Object.fromEntries(new FormData(e.target)).gender_id)));
    const gender_id = Object.fromEntries(new FormData(e.target)).gender_id * 1;
    // console.log(gender_id);
    // setInputs((prev) => ({
    //   ...prev,
    //   gender_id: g,
    // }));
    // console.log(inputs);
    dispatch(setRegistrationTHUNK(inputs, gender_id));
    dispatch(checkAuthTHUNK());
    console.log(auth);
    if (auth?.err) {
      setIsValid(false);
    } else {
      setIsValid(true);
      navigate('/');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setDirty((prev) => ({ ...prev, [e.target.name]: true }));
        break;
      case 'password':
        setDirty((prev) => ({ ...prev, [e.target.name]: true }));
        break;
      case 'checkPas':
        setDirty((prev) => ({ ...prev, [e.target.name]: true }));
        break;
      case 'nickName':
        setDirty((prev) => ({ ...prev, [e.target.name]: true }));
        break;
    }
  };

  return (
    <div className="container register-form">
      <div className="form">
        <form onSubmit={submitHandler}>
          <h1>Регистрация</h1>
          {isValid ? <p /> : <h2>нет</h2>}
          <label htmlFor="usr">
            <p className="label-txt">Введите свое имя</p>
            <input type="text" name="name" onChange={inputHandler} value={inputs.name} className="input" id="usr" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой nickName</p>
            {(dirty.nickName && error.nickName) && <div className="error" style={{ color: 'red' }}>{error.nickName}</div>}
            <input onBlur={(e) => blurHandler(e)} type="text" name="nickName" onChange={inputHandler} value={inputs.nickName} className="input" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой email</p>
            {(dirty.email && error.email) && <div className="error" style={{ color: 'red' }}>{error.email}</div>}
            <input onBlur={(e) => blurHandler(e)} type="email" name="email" onChange={inputHandler} value={inputs.email} className="input" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="pw">
            <p className="label-txt">Введите пароль (не менее 6 символов)</p>
            {(dirty.password && error.password) && <div className="error" style={{ color: 'red' }}>{error.password}</div>}
            <input onBlur={(e) => blurHandler(e)} onChange={inputHandler} name="password" value={inputs.password} type="password" className="input" id="pw" style={{ color: validPassword(inputs.password) ? 'green' : 'red' }} />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="rep">
            <p className="label-txt">Повторите пароль</p>
            <input onBlur={(e) => blurHandler(e)} type="password" onChange={inputHandler} className="input" name="checkPas" value={inputs.checkPas} id="rep" style={{ color: inputs.checkPas === inputs.password && validPassword(inputs.password) ? 'green' : 'red' }} />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <select name="gender_id" className="form-select mt-10" aria-label="Default select example">
            <option defaultValue="1">Выберите пол</option>
            <option value="1">Мужской</option>
            <option value="2">Женский</option>
          </select>
          {validPassword(inputs.password) && inputs.checkPas === inputs.password
            ? <button type="submit" className="btn btn-success btn-lg" style={{ width: '15rem', marginTop: '20px' }}>Зарегистрироваться</button>
            : <button type="submit" className="btn btn-danger btn-lg" disabled style={{ width: '15rem', marginTop: '20px' }}>Зарегистрироваться</button> }
        </form>
      </div>
    </div>
  );
}
