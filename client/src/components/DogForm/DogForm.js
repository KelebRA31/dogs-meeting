import React from 'react';
import './DogForm.css';

function DogForm(props) {
  return (
    <div>
      <form className=" container-DogForm">
        <div className="input-DogForm">
          <label htmlFor="">Имя собаки</label>
          <input className="form-DogForm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <div className="input-DogForm">
          <label htmlFor="exampleInputEmail1">Возраст собаки</label>
          <input type="Number" className="form-DogForm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <div className="input-DogForm">
          <label htmlFor="exampleInputEmail1">Порода собаки</label>
          <input className="form-DogForm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <button type="submit" className="btn btn-outline-warning button-DogForm">Добавить собаку</button>
      </form>
    </div>
  );
}

export default DogForm;
