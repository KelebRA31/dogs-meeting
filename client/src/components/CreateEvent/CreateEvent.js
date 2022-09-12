import React, { useState } from 'react';
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
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, SwipeableDrawer } from '@mui/material';
import { createEventTHUNK } from '../../redux/actions/eventAction';

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

export default function BlogPosts({ blogPostsState, setBlogPostsState }) {
  const { event } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { eventData, loading } = event;

  const [locale, setLocale] = useState('ru');
  const [inputValue, setInputValue] = useState({
    comment: '',
    // dog_id_creator: null,
    start: dayjs('2020-01-01 12:00'),
    end: dayjs('2020-01-01 13:00'),
    private: false,
    password: '',

  });
  console.log('1====', JSON.stringify(inputValue.comment));
  console.log('2====', JSON.stringify(inputValue.start.$d));
  console.log('3====', JSON.stringify(inputValue.private));
  // console.log('3====', JSON.stringify(inputValue.dog_id_creator));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEventTHUNK(inputValue));
  };

  const changeHandler = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    <Box className="mainBox">

      <form className="mainEventContainer" onSubmit={submitHandler}>

        <div className="eventContainer">
          <TextField
            id="filled-basic"
            variant="filled"
            name="comment"
            onChange={changeHandler}
            value={inputValue.comment}
            type="text"
            className="textfield"
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
      // value={dog_id_creator}
              onChange={changeHandler}
              name="dog_id_creator"
            >
              {/* тут должен быть map по собакам */}
              <MenuItem value={1}>Мухтар</MenuItem>
              <MenuItem value={2}>Рэкс</MenuItem>

            </Select>
          </FormControl>
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
            <ThemeProvider
              theme={theme}
            >

              <FormControlLabel
                control={(
                  <CustomCheckbox
                    type="checkbox"
                    id="flexCheckDefault"
                    value={inputValue.private}
                    onChange={() => setInputValue((prev) => ({ ...prev, private: !prev.private }))}
                  />
)}
                label="Приватный"
              />

            </ThemeProvider>
            {inputValue.private && (
            <div className="mb-3">
              <TextField
                id="filled-basic"
                variant="filled"
                name="password"
                value={inputValue.password}
                onChange={changeHandler}
                type="text"
              />
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
    </Box>
  );

  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>

          {/* <Button onClick={toggleDrawer(anchor, true)}>
            <ToggleButton value="justify" key="justify">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </Button> */}

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
