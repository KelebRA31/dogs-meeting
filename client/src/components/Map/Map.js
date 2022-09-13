/* eslint-disable prefer-rest-params */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Map.css';
import BlogPosts from '../BlogPosts/BlogPosts';
import CreateEvent from '../CreateEvent/CreateEvent';

const { ymaps } = window;

export default function Map() {
  const [blogPostsState, setBlogPostsState] = React.useState({ right: false });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event
  //           && event.type === 'keydown'
  //           && (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return;
  //   }
  //   setBlogPostsState({ ...blogPostsState, [anchor]: open });
  // };

  const [sidebarState, setSidebarState] = useState(false);
  const center = [55.7536760175035, 37.61988016065489];
  //   const center = [20, 20];

  //   const [map, setMap] = useState(null);

  function init() {
    const myMap = new ymaps.Map('map', {
      center,
      zoom: 10,
    }, {
      searchControlProvider: 'yandex#search',
    });

    // / /////////////////////////////////////////////////////////////////////////////////
    // Создание макета балуна на основе Twitter Bootstrap.
    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass('<div class="popover top">'
      + '<a class="close" href="#">&times;</a>'
      + '<div class="arrow"></div>'
      + '<div class="popover-inner">'
        + '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]'
      + '</div>'
    + '</div>', {
    //   /**
    //   * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
    //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
    //   * @function
    //   * @name build
    //   */
      build() {
        this.constructor.superclass.build.call(this);

        this._element = this.getParentElement().querySelector('.popover');
        this._onCloseClick = this.onCloseClick.bind(this);

        this.applyElementOffset();

        this._element.querySelector('.close').addEventListener('click', this._onCloseClick);
      },

      //   /**
      //   * Удаляет содержимое макета из DOM.
      //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
      //   * @function
      //   * @name clear
      //   */
      clear() {
        this._element.querySelector('.close').removeEventListener('click', this._onClickClick);

        this.constructor.superclass.clear.call(this);
      },

      //   /**
      //   * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
      //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
      //   * @function
      //   * @name onSublayoutSizeChange
      //   */
      onSublayoutSizeChange() {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if (!this._isElement(this._element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire('shapechange');
      },

      //   /**
      //   * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
      //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
      //   * @function
      //   * @name applyElementOffset
      //   */
      applyElementOffset() {
        Object.assign(this._element.style, {
          left: `${-(this._element.offsetWidth / 2)}px`,
          top: `${-(this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight)}px`,
        });
      },

      //   /**
      //   * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
      //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
      //   * @function
      //   * @name onCloseClick
      //   */
      onCloseClick(e) {
        e.preventDefault();

        this.events.fire('userclose');
      },

      //   /**
      //   * Используется для автопозиционирования (balloonAutoPan).
      //   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
      //   * @function
      //   * @name getClientBounds
      //   * @returns {Number[][]}
      //   Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
      //   */
      getShape() {
        if (!this._isElement(this._element)) {
          return MyBalloonLayout.superclass.getShape.call(this);
        }

        const style = getComputedStyle(this._element);
        const position = {
          left: parseFloat(style.left),
          top: parseFloat(style.top),
        };

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
          [position.left, position.top], [
            position.left + this._element.offsetWidth,
            position.top + this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight,
          ],
        ]));
      },

      //   /**
      //   * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
      //   * @function
      //   * @private
      //   * @name _isElement
      //   * @param {jQuery} [element] Элемент.
      //   * @returns {Boolean} Флаг наличия.
      //   */
      _isElement(element) {
        return element && element.querySelector('.arrow');
      },
    });

    // Создание вложенного макета содержимого балуна.
    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<h3 class="popover-title">$[properties.balloonHeader]</h3>'
    + '<div class="popover-content">$[properties.balloonContent]</div>',
    );

    // Создание метки с пользовательским макетом балуна.
    const myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      balloonHeader: 'Заголовок балуна',
      balloonContent: 'Контент балуна',
    }, {
      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
      balloonPanelMaxMapArea: 0,
      // Не скрываем иконку при открытом балуне.
      // hideIconOnBalloonOpen: false,
      // И дополнительно смещаем балун, для открытия над иконкой.
      // balloonOffset: [3, -40]
      iconLayout: 'default#image',
      iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
      iconImageSize: [40, 40],
      iconImageOffset: [-19, -36],
    });

    myMap.geoObjects.add(myPlacemark);
    // / /////////////////////////////////////////////////////////////////////////////////
    document.querySelector('#set-balloon-header').addEventListener('click', () => {
      window.myPlacemark.properties.set(
        'balloonHeader',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      );
    });

    document.querySelector('#set-balloon-content').addEventListener('click', () => {
      window.myPlacemark.properties.set(
        'balloonContent',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      );
    });

    // document.querySelector('#yyy').addEventListener('click', () => {
    //   console.log('yyyyyyyyy');
    // });
    // / /////////////////////////////////////////////////////////////////////////////////

    // setMap(myMap);

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', (e) => {
      if (!myMap.balloon.isOpen()) {
        const coords = e.get('coords');
        console.log(coords);
        console.log(blogPostsState);
        setBlogPostsState({ ...blogPostsState, right: true });
        // toggleDrawer('right', true);
        // setBlogPostsState({ right: true });
        console.log(blogPostsState);

        myMap.balloon.open(coords, {
          contentHeader: 'Событие!',
          contentBody: '<button id="yyy">sss</button'
                    + `<p>Координаты щелчка: ${[
                      coords[0].toPrecision(6),
                      coords[1].toPrecision(6),
                    ].join(', ')}</p>`,
          contentFooter: '<sup>Щелкните еще раз</sup>',
        });
      } else {
        myMap.balloon.close();
      }
      handleOpen();
    });

    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', (e) => {
      myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });

    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', (e) => {
      myMap.hint.close();
    });
  }

  const placemark = (place) => new ymaps.Placemark(place, {}, {

    iconLayout: 'default#image',
    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
    iconImageSize: [40, 40],
    iconImageOffset: [-19, -36],

  });

  //   if (map) {
  //     const myGeocoder = ymaps.geocode('Южнобутовская 66');
  //     myGeocoder.then(
  //       (res) => {
  //         const place = placemark(res.geoObjects.get(0).geometry.getCoordinates());

  //         setMap((prev) => {
  //           prev.geoObjects.add(
  //             place
  //           );
  //           // prev[center] = place;
  //           return prev;
  //         });
  //       },
  //       (err) => {
  //         alert('Ошибка', err);
  //       }
  //     );
  //   }

  useEffect(() => {
    ymaps.ready(init);
  }, []);



  return (
    <div className="mapContainerSuper">
      <div id="map" className="mapContainer">
        <button type="button" id="set-balloon-header" className="btn">Задать заголовок балуна</button>
        <button type="button" id="set-balloon-content" className="btn">Задать содержимое балуна</button>
        <CreateEvent
          blogPostsState={blogPostsState}
          setBlogPostsState={setBlogPostsState}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      </div>
    </div>
  );
}
