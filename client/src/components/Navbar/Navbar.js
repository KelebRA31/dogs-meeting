import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutTHUNK } from '../../redux/actions/authAction';
import './Navbar.css';

export default function Navbar() {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg color-Navbar shade-Navbar">
      <div className="container-fluid " id="container-Navbar">
        <div className="logo-Navbar">
          <NavLink to="/" className="logo-color-Navbar"><img className="logo-circle-Navbar" src="/Images/DogsWalk.png" width="40px" alt="logo" /></NavLink>
          <NavLink to="/" className="logo-color-Navbar">DogsMeeting</NavLink>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Ник пользователя..." aria-label="Search" />
            <button className="btn  text-color-Navbar" type="submit">Поиск</button>
          </form>
        </div>
        <div id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link text-color-Navbar" aria-current="page" to="/">Главная</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-color-Navbar" to="/about">О Приложении</NavLink>
            </li>
            {auth
              ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-color-Navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to={`/profile/${auth?.id}`}>Мой профиль</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/myfriends/${auth?.id}`}>Мои друзья</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/mydogs/${auth?.id}`}>Мой собаки</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(logoutTHUNK());
                          navigate('/');
                        }}
                      >
                        Выход
                      </a>

                    </li>
                  </ul>
                </li>
              )
              : (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-color-Navbar" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </Link>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/registration">Регистрация</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/login">Вход</NavLink></li>
                  </ul>
                </li>

              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
