import React from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const { image, onClose } = this.props;

    return (
      <div className={css.Overlay} onClick={onClose}>
        <div className={css.Modal}>
          <img
            src={image.largeImageURL}
            alt={image.id}
            onClick={event => event.stopPropagation()}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
