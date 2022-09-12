import React from 'react';

function DogForm(props) {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Имя собаки</label>
          <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Возраст собаки</label>
          <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Порода собаки</label>
          <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите имя собаки" />
        </div>
        <button type="submit" className="btn btn-primary">Добавить собаку</button>
      </form>
    </div>
  );
}

export default DogForm;
