/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-rest-params */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
import React, { useEffect, useState } from 'react';
import './Map.css';
import { useSelector, useDispatch } from 'react-redux';
import BlogPosts from '../BlogPosts/BlogPosts';
import CreateEvent from '../CreateEvent/CreateEvent';
import { getEventTHUNK } from '../../redux/actions/eventAction';

const { ymaps } = window;

export default function Map() {
  const [myMap, setMyMap] = useState(null);
  const [blogPostsState, setBlogPostsState] = useState({ right: false });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const events = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const [sidebarState, setSidebarState] = useState(false);
  const center = [55.7536760175035, 37.61988016065489];

  const MyBalloonContentLayout = ymaps.templateLayoutFactory?.createClass(
    '<h3 class="popover-title">$[properties.balloonHeader]</h3>'
  + '<div class="popover-content">$[properties.balloonContent]</div>',
  );

  const MyBalloonLayout = ymaps.templateLayoutFactory?.createClass('<div class="popover top">'
      + '<a class="close" href="#">&times;</a>'
      + '<div class="arrow"></div>'
      + '<div class="popover-inner">'
        + '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]'
      + '</div>'
    + '</div>', {
    build() {
      this.constructor.superclass.build.call(this);

      this._element = this.getParentElement().querySelector('.popover');
      this._onCloseClick = this.onCloseClick.bind(this);

      this.applyElementOffset();

      this._element.querySelector('.close').addEventListener('click', this._onCloseClick);
    },

    clear() {
      this._element.querySelector('.close').removeEventListener('click', this._onClickClick);

      this.constructor.superclass.clear.call(this);
    },

    onSublayoutSizeChange() {
      MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

      if (!this._isElement(this._element)) {
        return;
      }

      this.applyElementOffset();

      this.events.fire('shapechange');
    },

    applyElementOffset() {
      Object.assign(this._element.style, {
        left: `${-(this._element.offsetWidth / 2)}px`,
        top: `${-(this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight)}px`,
      });
    },

    onCloseClick(e) {
      e.preventDefault();

      this.events.fire('userclose');
    },

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

    _isElement(element) {
      return element && element.querySelector('.arrow');
    },
  });

  function init() {
    if (!myMap) {
      const m = new ymaps.Map('map', {
        center,
        zoom: 10,
      }, {
        searchControlProvider: 'yandex#search',
      });

      setMyMap(m);
      return null;
    }

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

    function getAddress(coords) {
      window.myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        const location = firstGeoObject.properties._data.text;
        console.log('geo ->>>>', firstGeoObject.properties._data.text);

        window.myPlacemark.properties
          .set({
            iconCaption: [
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ].filter(Boolean).join(', '),
            balloonContent: firstGeoObject.getAddressLine(),
          });
      });
    }
    myMap.events.add('click', (e) => {
      if (!myMap.balloon.isOpen()) {
        const coords = e.get('coords');
        setBlogPostsState({ ...blogPostsState, right: true, coords });
      } else {
        myMap.balloon.close();
      }
      handleOpen();
    });
    myMap.events.add('contextmenu', (e) => {
      myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });

    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', (e) => {
      myMap.hint.close();
    });

    return null;
  }

  useEffect(() => {
    ymaps.ready(init);
    dispatch(getEventTHUNK());
  }, [myMap]);

  useEffect(() => {
    if (events?.eventData && myMap) {
      console.log(events);
      events.eventData.forEach((el) => {
        const myPlacemark = new ymaps.Placemark([el.latitude, el.longtitude], {
          // balloonHeader: 'Заголовок балуна',
          balloonContent: `<div><a href='/event/${el.user_id_creator}/${el.id}'>link</a></div>`,
        }, {
          // balloonShadow: false,
          // balloonLayout: MyBalloonLayout,
          // balloonContentLayout: MyBalloonContentLayout,
          // balloonPanelMaxMapArea: 0,

          iconLayout: 'default#image',
          iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6680/6680947.png',
          iconImageSize: [40, 40],
          iconImageOffset: [-19, -36],
        });

        myMap.geoObjects.add(myPlacemark);
      });
    }
  }, [events, myMap]);

  return (
    <div className="mapContainerSuper">
      <div id="map" className="mapContainer">
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
