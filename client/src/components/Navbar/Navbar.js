import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-color navbar-shade">
      <div className="container-fluid " id="navbar-container">
        <div>
          <a className="navbar-brand text-color-Navbar" href="#"><img className="navbar-logo" src="Images/DogsWalk.png" width="40px" alt="logo" /></a>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Ник пользователя..." aria-label="Search" />
            <button className="btn  text-color-Navbar" type="submit">Поиск</button>
          </form>
        </div>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link text-color-Navbar" aria-current="page" href="#">Главная</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-color-Navbar" href="#">О Приложении</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-color-Navbar" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Личный кабинет
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Мой профиль</a></li>
                <li><a className="dropdown-item" href="#">Мои друзья</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Выход</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
