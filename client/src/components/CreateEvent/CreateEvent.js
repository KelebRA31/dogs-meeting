import React, { useState } from 'react';
import './CreateEvent.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import { createEventTHUNK } from '../../redux/actions/eventAction';

export default function CreateEvent() {
  const { event } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { eventData, loading } = event;

  const [locale, setLocale] = useState('ru');
  const [isPrivate, setPrivate] = useState(false);
  const [inputValue, setInputValue] = useState({
    comment: '',
    start: dayjs('2020-01-01 12:00'),
    end: dayjs('2020-01-01 13:00'),
    private: false,
    password: '',

  });

  console.log('====', JSON.stringify(inputValue.start.$d));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEventTHUNK);
  };

  const changeHandler = (e) => {
    dispatch(setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    })));
  };
  return (

    <form className="mainEventContainer" onSubmit={submitHandler}>

      <div className="eventContainer">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Описание ивента" aria-label="Username" aria-describedby="basic-addon1" onChange={changeHandler} value={inputValue.comment} />
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="false" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Собака №1
          </label>
        </div>
        <div className="timeContainer">

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <TimePicker
              className="timePicker"
              label="Начало прогулки"
              name="start"
              value={inputValue.start}
              onChange={setInputValue}
              minTime={dayjs('2022-01-01T07:00')}
              maxTime={dayjs('2022-01-01T23:59')}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              className="timePicker"
              label="Конец прогулки"
              name="end"
              value={inputValue.end}
              onChange={setInputValue}
              minTime={dayjs('2022-01-01T07:00')}
              maxTime={dayjs('2022-01-01T23:59')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            value={inputValue.private}
            onChange={() => setInputValue((prev) => ({ ...prev, private: !prev.private }))}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Приватный ивент
          </label>
          {inputValue.private && (
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Впишите пароль" aria-label="Username" aria-describedby="basic-addon1" name="password" value={inputValue.password} onChange={changeHandler} />
            </div>
          )}
        </div>

      </div>
      <LoadingButton
        onClick={submitHandler}
        size="small"
        type="submit"
        loading={loading}
        loadingIndicator="Loading…"
        variant="outlined"
      >
        Создать прогулку
      </LoadingButton>
    </form>

  );
}
