import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  handleImageClick = image => {
    this.props.onImageClick(image);
  };

  render() {
    const { images } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={this.handleImageClick}
          />
        ))}
      </ul>
    );
  }
}