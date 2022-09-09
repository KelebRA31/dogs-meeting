import React, { useEffect, useState } from 'react';
import './Map.css';

const { ymaps } = window;

export default function Map() {
  const center = [55.76, 37.64];
  const [coordinates, setCoordinates] = useState('');
  function init() {
    const map = new ymaps.Map('map', {
      center, // Москва
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    });
    console.log(coordinates);

    const placemark = new ymaps.Placemark(center, {}, {
      // hintContent: 'Собственный значок метки',
      // balloonContent: 'Это красивая метка',

      iconLayout: 'default#image',
      iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
      iconImageSize: [40, 40],
      // // iconImageOffset: [-19, -44],

    });

    map.geoObjects.add(placemark);
  }
  const myGeocoder = ymaps.geocode('Бутово');
  myGeocoder.then(
    (res) => {
      alert(`Координаты объекта :${res.geoObjects.get(0).geometry.getCoordinates()}`);
    },
    (err) => {
      alert('Ошибка');
    },
  );
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return (
    <div>

      <div id="map" className="mapContainer" />
    </div>
  );
}
