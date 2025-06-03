import { type FC, useState } from 'react';
import styles from './sidebar.module.css';

export const FilterSidebar: FC = () => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [priceMinimum, setPriceMinimum] = useState('');
  const [priceMaximum, setPriceMaximum] = useState('');

  return (
    <aside className={styles.sidebar}>
      <form className={styles.filterForm}>
        <h3 className={styles.formTitle}>Filters</h3>
        {/* Artist */}
        <div className={styles.filterItems}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Artist:</label>
            {['Artist1', 'Artist2', 'Artist3'].map(artist => (
              <label key={artist} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedArtists.includes(artist)}
                  onChange={event =>
                    setSelectedArtists(previousArtists =>
                      event.target.checked
                        ? [...previousArtists, artist]
                        : previousArtists.filter(existingArtist => existingArtist !== artist)
                    )
                  }
                />
                {artist}
              </label>
            ))}
          </div>
          {/* Color */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Color:</label>
            {['Black', 'Red', 'Blue'].map(color => (
              <label key={color} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={event =>
                    setSelectedColors(previousColors =>
                      event.target.checked
                        ? [...previousColors, color]
                        : previousColors.filter(existingColor => existingColor !== color)
                    )
                  }
                />
                {color}
              </label>
            ))}
          </div>

          {/* Size */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Size:</label>
            {['S', 'M', 'L', 'XL', 'CUSTOM'].map(size => (
              <label key={size} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={event =>
                    setSelectedSizes(previousSizes =>
                      event.target.checked
                        ? [...previousSizes, size]
                        : previousSizes.filter(existingSize => existingSize !== size)
                    )
                  }
                />
                {size}
              </label>
            ))}
          </div>
          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Price Range:</label>
            <div className={styles.priceRangeContainer}>
              <input
                type="number"
                placeholder="Min"
                min="0"
                value={priceMinimum}
                onChange={event => setPriceMinimum(event.target.value)}
                className={styles.priceInput}
              />
              <input
                type="number"
                placeholder="Max"
                min="0"
                value={priceMaximum}
                onChange={event => setPriceMaximum(event.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.applyFilterButton}>
            Apply
          </button>
          <button type="button" className={styles.resetFilterButton}>
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
};
