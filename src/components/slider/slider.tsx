import { type FC, useState } from 'react';
import styles from './slider.module.css';

interface ImageSliderProps {
  imageUrls: string[];
  altBase?: string;
}

export const ImageSlider: FC<ImageSliderProps> = ({ imageUrls, altBase = 'Product image' }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePreviousImage = (): void => {
    setCurrentImage(previous => (previous === 0 ? imageUrls.length - 1 : previous - 1));
  };

  const handleNextImage = (): void => {
    setCurrentImage(previous => (previous === imageUrls.length - 1 ? 0 : previous + 1));
  };

  if (imageUrls.length === 0) {
    return <div className={styles.imageSlider}>No images available</div>;
  }

  return (
    <div className={styles.imageSlider}>
      <img src={imageUrls[currentImage]} alt={`${altBase} ${currentImage + 1}`} className={styles.sliderImage} />
      {imageUrls.length > 1 && (
        <div className={styles.sliderControls}>
          <button onClick={handlePreviousImage} className={styles.sliderButton}>
            &lt;
          </button>
          <span className={styles.sliderIndex}>
            {currentImage + 1} / {imageUrls.length}
          </span>
          <button onClick={handleNextImage} className={styles.sliderButton}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
