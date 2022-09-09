import React, { useEffect, useState } from 'react';
import './Map.css';

const { ymaps } = window;

export default function Map() {
  const center = [55.752010565380814, 37.61879118379485];
  const [map, setMap] = useState(null);

  function init() {
    setMap(new ymaps.Map('map', {
      center,
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    }));
  }
  console.log(map);

  const placemark = (place) => new ymaps.Placemark(place, {}, {

    iconLayout: 'default#image',
    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
    iconImageSize: [40, 40],
    iconImageOffset: [-19, -36],

  });

  if (map) {
    const myGeocoder = ymaps.geocode('Южнобутовская 66');
    myGeocoder.then(
      (res) => {
        const place = placemark(res.geoObjects.get(0).geometry.getCoordinates());

        setMap((prev) => {
          prev.geoObjects.add(
            place,
          );
          // prev[center] = place;
          return prev;
        });
      },
      (err) => {
        alert('Ошибка', err);
      },
    );
  }

  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return (
    <div>

      <div id="map" className="mapContainer" />
    </div>
  );
}
