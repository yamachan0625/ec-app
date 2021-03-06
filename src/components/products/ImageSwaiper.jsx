import React from 'react';
import Swaiper from 'react-id-swiper';
import NoImage from '../../assets/img/src/no_image.png';
import 'swiper/css/swiper.css';

const ImageSwaiper = (props) => {
  const [params] = React.useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
  });

  const images = props.images;

  return (
    <Swaiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        images.map((image) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swaiper>
  );
};

export default ImageSwaiper;
