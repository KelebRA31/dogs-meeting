/* eslint-disable max-len */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import './CreateEvent.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
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

export default function CreateEvent({
  blogPostsState, setBlogPostsState, handleOpen, handleClose, setOpen, open,
}) {
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

  const { eventData, loading } = event;

  const [locale, setLocale] = useState('ru');
  const [inputValue, setInputValue] = useState({
    comment: '',
    private: false,
    password: '',

  });

  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  // console.log(start.$d);

  const submitHandler = (e) => {
    e.preventDefault();
   
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 528,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const list = (anchor) => (
    <div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="mainBox">
            {auth ? (
              <form className="mainEventContainer" onSubmit={submitHandler}>

                <div className="eventContainer">
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    name="comment"
                  // onChange={changeHandler}
                  // value={inputValue.comment}
                    type="text"
                    className="textfield"
                  />
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
// value={dog_id_creator}
                    // onChange={changeHandler}
                      name="dog_id_creator"
                    >
                      {/* тут должен быть map по собакам */}
                      {dog?.map((el) => (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>))}

                      {/* <MenuItem value={1}>Мухтар</MenuItem>
                    <MenuItem value={2}>Рэкс</MenuItem> */}

                    </Select>
                  </FormControl>
                  <div className="timeContainer">

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                      <Stack spacing={3}>
                        <DateTimePicker
                          renderInput={(params) => <TextField {...params} />}
                          label="Начало прогулки"
                          className="timePicker"
                          name="start"
                          value={start}
                          onChange={(newValue) => {
                            setStart(newValue);
                          }}
                      // value={inputValue.start}
                      // onChange={setInputValue}
                          minDateTime={dayjs()}
                        />
                        <DateTimePicker
                          className="timePicker"
                          renderInput={(params) => <TextField {...params} />}
                          label="Конец прогулки"
                          name="end"
                          value={end}
                          onChange={(newValue) => {
                            setEnd(newValue);
                          }}
                      // value={inputValue.end}
                      // onChange={setInputValue}
                          minDateTime={dayjs()}
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
                          // value={inputValue.private}
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
                      // value={inputValue.password}
                      // onChange={changeHandler}
                        type="text"
                      />
                    </div>
                    )}
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
            ) : (
              <>
                <Link to="/registration">Нужно зарегитирроваться</Link>
                <p> </p>
                <Link to="/login">Или войти</Link>
              </>
            )}

          </Box>
        </Modal>
      </div>
      <Box className="mainBox" />
    </div>
  );

  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <button type="button" id="set-balloon-header" style={{ display: 'none' }} className="btn">Задать заголовок балуна</button>
          <button type="button" id="set-balloon-content" style={{ display: 'none' }} className="btn">Задать содержимое балуна</button>

          {/* <Button onClick={toggleDrawer(anchor, true)}>
            <ToggleButton value="justify" key="justify">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </Button> */}
          <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            anchor={anchor}
            open={blogPostsState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}

          </Modal>
          {/* <SwipeableDrawer
            anchor={anchor}
            open={blogPostsState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}432p/.,
          >
            {list(anchor)}
          </SwipeableDrawer> */}
        </React.Fragment>
      ))}
    </div>
  );
}
