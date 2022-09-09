import React, { useEffect, useState } from 'react';
import './Map.css';

const { ymaps } = window;

export default function Map() {
  // const center = [55.752010565380814, 37.61879118379485];
  // const [map, setMap] = useState(null);

  // function init() {
  //   setMap(new ymaps.Map('map', {
  //     center,
  //     zoom: 10,
  //   }, {
  //     searchControlProvider: 'yandex#search',
  //   }));

  // const placemark = (place) => new ymaps.Placemark(place, {}, {

  //   iconLayout: 'default#image',
  //   iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
  //   iconImageSize: [40, 40],
  //   iconImageOffset: [-19, -36],

  // });

  // if (map) {
  //   const myGeocoder = ymaps.geocode('Южнобутовская 66');
  //   myGeocoder.then(
  //     (res) => {
  //       const place = placemark(res.geoObjects.get(0).geometry.getCoordinates());

  //       setMap((prev) => {
  //         prev.geoObjects.add(
  //           place,
  //         );
  //         // prev[center] = place;
  //         return prev;
  //       });
  //     },
  //     (err) => {
  //       alert('Ошибка', err);
  //     },
  //   );
  // }

  function init() {
    let myPlacemark;
    const myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9,
    }, {
      searchControlProvider: 'yandex#search',
    });

    // Слушаем клик на карте.
    myMap.events.add('click', (e) => {
      const coords = e.get('coords');

      // Создание метки.
      function createPlacemark(coords2) {
        return new ymaps.Placemark(coords2, {
          iconCaption: 'поиск...',
        }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true,
        });
      }

      // Определяем адрес по координатам (обратное геокодирование).
      function getAddress(coords1) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords1).then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          myPlacemark.properties
            .set(
              {
                // Формируем строку с данными об объекте.
                iconCaption: [
                  // Название населенного пункта или
                  // вышестоящее административно-территориальное образование.
                  firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                  // Получаем путь до топонима, если метод
                  // вернул null, запрашиваем наименование здания.
                  firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                ].filter(Boolean).join(', '),
                // В качестве контента балуна задаем строку с адресом объекта.
                balloonContent: '<div id="driver-2" class="driver-card"><button onClick={submitHandler}>click</button></div>',
              },
            );
        });
      }

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        console.log(`---> ${coords}`);
        myPlacemark.geometry.setCoordinates(coords);
      } else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add('dragend', () => {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });
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
