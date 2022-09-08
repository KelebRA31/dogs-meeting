import React, { useEffect } from 'react';
import './Map.css';

const { ymaps } = window;

export default function Map() {
  const center = [55.76, 37.64];
  function init() {
    const map = new ymaps.Map('map', {
      center, // Москва
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    });

    const placemark = new ymaps.Placemark(center, {}, {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка',

      iconLayout: 'default#image',
      iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
      iconImageSize: [40, 40],
      // // iconImageOffset: [-19, -44],

    });

    map.geoObjects.add(placemark);
  }
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return (
    <div id="map" className="mapContainer" />
  );
}
