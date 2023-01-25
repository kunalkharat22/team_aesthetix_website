import React from 'react'
import styles from '../styles/ImageModal.module.scss'


const ImageModal = ({imageUrl, onClose}) => {
  return (
    <div className={styles.imageModalContainer}>
      <div className={styles.imageModalOverlay} onClick={onClose} />
      <div className={styles.imageModalContent}>
        <img src={imageUrl} className={styles.imageModalImage} />        
      </div>
      <div className={styles.imageModalCloseButton}>
        <h1 onClick={onClose}>X</h1>
      </div>
    </div>
  )
}

export default ImageModal