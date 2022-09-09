import React, { useState } from 'react';
import './CreateEvent.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ClockPicker } from '@mui/x-date-pickers/ClockPicker';

export default function CreateEvent() {
  const [date, setDate] = React.useState(dayjs());
  const [isPrivate, setPrivate] = useState(false);

  const submitHandler = () => {

  };
  return (

    <form className="mainEventContainer" onSubmit={submitHandler}>

      <div className="eventContainer">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Описание ивента" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Собака №1
          </label>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Назначь время прогулки
          </label>
          <ClockPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" onClick={() => setPrivate(!isPrivate)} value={isPrivate} id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Приватный ивент
          </label>
          {isPrivate ? (
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Впишите пароль" aria-label="Username" aria-describedby="basic-addon1" />

            </div>
          ) : <p />}
        </div>
      </div>
    </form>

  );
}
