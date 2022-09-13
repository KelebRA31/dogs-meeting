/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import './CreateEvent.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, SwipeableDrawer } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createEventTHUNK } from '../../redux/actions/eventAction';
import { checkAuthTHUNK } from '../../redux/actions/authAction';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  '&.Mui-checked': {
    color: theme.status.danger,
  },
}));
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

export default function CreateEvent({ blogPostsState, setBlogPostsState }) {
  const navigate = useNavigate();
  const event = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dog);
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(checkAuthTHUNK());
  // }, []);
  useEffect(() => {
    if (auth) {
      dispatch(getDogInfoTHUNK(auth?.id));
    }
  }, [auth]);
  console.log(auth);

  const { eventData, loading } = event;

  const [locale, setLocale] = useState('ru');
  const [inputValue, setInputValue] = useState({
    comment: '',
    private: false,
    password: '',

  });

  const [start, setStart] = useState(dayjs('2020-01-01 12:00'));
  const [end, setEnd] = useState(dayjs('2020-01-01 13:00'));

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log({
      ...Object.fromEntries(new FormData(e.target)),
      latitude: blogPostsState.coords[0],
      longtitude: blogPostsState.coords[1],
    });
    const eventData = {
      ...Object.fromEntries(new FormData(e.target)),
      latitude: blogPostsState.coords[0],
      longtitude: blogPostsState.coords[1],
      start,
      end,
    };
    dispatch(createEventTHUNK(eventData));
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setBlogPostsState({ ...blogPostsState, [anchor]: open });
  };

  const list = (anchor) => (

    <form onSubmit={submitHandler} className="mainEventContainer">
      <div className="eventContainer">
        <TextField
          id="filled-basic"
          variant="filled"
          name="comment"
          type="text"
          className="textfield"
        />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="dog_id_creator"
          >
            {dog?.map((el) => (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>))}
          </Select>
        </FormControl>
        <div className="timeContainer">

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <Stack spacing={3}>
              <TimePicker
                className="timePicker"
                label="Начало прогулки"
                name="start"
                // value={inputValue.start}
                // onChange={timeHandler}
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                minTime={dayjs('2022-01-01T07:00')}
                maxTime={dayjs('2022-01-01T23:59')}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                className="timePicker"
                label="Конец прогулки"
                name="end"
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
                minTime={dayjs('2022-01-01T07:00')}
                maxTime={dayjs('2022-01-01T23:59')}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>

          </LocalizationProvider>
        </div>
        <div className="form-check">
          <ThemeProvider
            theme={theme}
          >

            <FormControlLabel
              control={(
                <CustomCheckbox
                  type="checkbox"
                  id="flexCheckDefault"
                  onChange={() => setInputValue((prev) => ({ ...prev, private: !prev.private }))}
                />
)}
              label="Приватный"
            />

          </ThemeProvider>
          <div className="mb-3">
            <TextField
              id="filled-basic"
              variant="filled"
              name="password"
              type="text"
            />
          </div>
        </div>

      </div>
      <LoadingButton
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

  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>

          <SwipeableDrawer
            anchor={anchor}
            open={blogPostsState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
