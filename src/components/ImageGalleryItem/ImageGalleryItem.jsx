import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  const handleImageClick = () => {
    onClick(image);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleImageClick}>
      <img
        src={image.webformatURL}
        alt={image.id}
        className={css.ImageGalleryItem__image}
      />
    </li>
  );
};