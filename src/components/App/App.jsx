import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fetchPictures, normalizedImages, perPage } from 'components/API/API';

import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    query: '',
    showModal: false,
    selectedImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSearch = query => {
    this.setState({ query, page: 1, images: [], error: null });
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetchPictures(query, page, perPage)
      .then(data => {
        const images = normalizedImages(data.hits);

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSearch={this.handleSearch} />
        {error && <p>Error: {error}</p>}
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {!isLoading && images.length >= perPage && (
          <Button onClick={this.loadMoreImages} />
        )}
        {showModal && <Modal image={selectedImage} onClose={this.closeModal} />}
      </div>
    );
  }
}