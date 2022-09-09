import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutTHUNK } from '../../redux/actions/authAction';
import './Navbar.css';

export default function Navbar() {
  const { auth } = useSelector((state) => state);

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
              <a className="nav-link text-color-Navbar" aria-current="page" href="/">Главная</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-color-Navbar" href="/about">О Приложении</a>
            </li>
            {auth
              ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-color-Navbar" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to={`/profile/${auth?.id}`}>Мой профиль</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/myfriends/${auth?.id}`}>Мои друзья</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/mydogs/${auth?.id}`}>Мой собаки</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={() => { dispatch(logoutTHUNK()); }}>Выход</a></li>
                  </ul>
                </li>
              )
              : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-color-Navbar" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/registration">Регистрация</a></li>
                    <li><a className="dropdown-item" href="/login">Вход</a></li>
                  </ul>
                </li>

              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
