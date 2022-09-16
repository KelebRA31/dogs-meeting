import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { checkAuthTHUNK, setRegistrationTHUNK } from '../../redux/actions/authAction';
import validPassword from '../../utils/validPassword';
import './Registration.css';
import { getUserInfoTHUNK } from '../../redux/actions/userAction';

export default function Registration() {
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const [badReg, setBadReg] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    nickName: '',
    checkPas: '',
  });
  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (data) => {
    // e.preventDefault();
    // console.log(typeof (Number(Object.fromEntries(new FormData(e.target)).gender_id)));
    // const gender_id = Object.fromEntries(new FormData(e.target)).gender_id * 1;
    // console.log(gender_id);
    // setInputs((prev) => ({
    //   ...prev,
    //   gender_id: g,
    // }));
    // console.log(inputs);
    // dispatch(setRegistrationTHUNK(inputs, gender_id));
    dispatch(setRegistrationTHUNK(data));
    // console.log(auth);
    if (!auth) {
      setBadReg(true);
      reset();
    } else {
      setBadReg(false);
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
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>Регистрация</h1>
          {badReg && <h2 style={{ color: '#BF1650' }}>Такой email или nickName уже существует</h2>}
          <label htmlFor="usr">
            <p className="label-txt">Введите свое имя</p>
            <input {...register('name')} onChange={inputHandler} value={inputs.name} className="input" id="usr" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой nickName</p>
            <input
              {...register('nickName', {
                required: 'Поле обязательно к заполнению!',
              })}
              onChange={inputHandler}
              value={inputs.nickName}
              className="input"
            />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <div>
            {errors?.nickName && <p>{errors?.nickName.message || 'Error!'}</p>}
          </div>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой email</p>
            <input
              type="email"
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
              })}
              onChange={inputHandler}
              value={inputs.email}
              className="input"
            />
            <div className="line-box">
              <div className="line" />
            </div>
            {errors?.email && <p>{errors?.email.message || 'Error!'}</p>}
          </label>
          <label htmlFor="pw">
            <p className="label-txt">Введите пароль (не менее 6 символов)</p>
            <input
              {...register('password', {
                required: 'Поле обязательно к заполнению!',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов!',
                },
              })}
              type="password"
              className="input"
              onChange={inputHandler}
              value={inputs.password}
              id="pw"
              style={{ color: validPassword(inputs.password) ? 'green' : 'red' }}
            />
            <div className="line-box">
              <div className="line" />
            </div>
            <div>
              {errors?.password && <p>{errors?.password.message || 'Error!'}</p>}
            </div>
          </label>
          <label htmlFor="rep">
            <p className="label-txt">Повторите пароль</p>
            <input type="password" onChange={inputHandler} className="input" name="checkPas" value={inputs.checkPas} id="rep" style={{ color: inputs.checkPas === inputs.password && validPassword(inputs.password) ? 'green' : 'red' }} />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <p className="label-txt">Выберите пол</p>
          <select
            {...register('gender_id', {
              required: 'Поле обязательно к заполнению!',
            })}
            name="gender_id"
            className="form-select mt-10"
            aria-label="Default select example"
          >
            <option value="1">Мужской</option>
            <option value="2">Женский</option>
          </select>
          <div>
            {errors?.gender_id && <p>{errors?.gender_id.message || 'Error!'}</p>}
          </div>
          {validPassword(inputs.password) && inputs.checkPas === inputs.password && isValid
            ? <button type="submit" className="btn btn-success btn-lg" style={{ width: '15rem', marginTop: '30px' }}>Зарегистрироваться</button>
            : <button type="submit" className="btn btn-danger btn-lg" disabled style={{ width: '15rem', marginTop: '30px' }}>Зарегистрироваться</button> }
        </form>
      </div>
    </div>
  );
}
