import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRegistrationTHUNK } from '../../redux/actions/authAction';
import validPassword from '../../utils/validPassword';
import './Registration.css';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    navigate('/');
  };

  return (
    <div className="container register-form">
      <div className="form">
        <form onSubmit={submitHandler}>
          <h1>Регистрация</h1>
          <label htmlFor="usr">
            <p className="label-txt">Введите свое имя</p>
            <input type="text" name="name" onChange={inputHandler} value={inputs.name} className="input" id="usr" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой nickName</p>
            <input type="text" name="nickName" onChange={inputHandler} value={inputs.nickName} className="input" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="usr">
            <p className="label-txt">Введите свой email</p>
            <input type="email" name="email" onChange={inputHandler} value={inputs.email} className="input" />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="pw">
            <p className="label-txt">Веедите пароль (не менее 6 символов)</p>
            <input onChange={inputHandler} name="password" value={inputs.password} type="password" className="input" id="pw" style={{ color: validPassword(inputs.password) ? 'green' : 'red' }} />
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label htmlFor="rep">
            <p className="label-txt">Повторите пароль</p>
            <input type="password" onChange={inputHandler} className="input" name="checkPas" value={inputs.checkPas} id="rep" style={{ color: inputs.checkPas === inputs.password && validPassword(inputs.password) ? 'green' : 'red' }} />
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
            ? <button type="submit" className="btn btn-success btn-lg" style={{ width: '10rem' }}>OK</button>
            : <button type="submit" className="btn btn-danger btn-lg" disabled style={{ width: '10rem' }}>NOT OK</button> }
        </form>
      </div>
    </div>
  );
}
