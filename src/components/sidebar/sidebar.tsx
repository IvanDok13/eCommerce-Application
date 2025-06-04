import React, { type FC, useMemo, useState } from 'react';
import styles from './sidebar.module.css';
import { type Filters, mockProducts } from '@components/product-list/product-list.types';

export const FilterSidebar: FC<{ onApply: (filters: Filters) => void }> = ({ onApply }) => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMinimum, setPriceMinimum] = useState('');
  const [priceMaximum, setPriceMaximum] = useState('');

  // getting unique values for artists, colors, sizes, and placements

  const artists = useMemo(() => {
    const unique = new Set<string>();
    mockProducts.forEach(product => unique.add(product.artist));
    return [...unique].sort();
  }, []);
  const colors = useMemo(() => {
    const unique = new Set<string>();
    mockProducts.forEach(product => {
      const c = product.color.toLowerCase();
      if (c.includes('black') || c.includes('grey') || c === 'black-white') {
        unique.add('black-white');
      } else {
        unique.add('colored');
      }
    });
    return [...unique].sort();
  }, []);

  const sizes = useMemo(() => {
    const unique = new Set<string>();
    mockProducts.forEach(product => unique.add(product.size));
    return [...unique].sort();
  }, []);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const priceMin = priceMinimum ? Number(priceMinimum) : undefined;
    const priceMax = priceMaximum ? Number(priceMaximum) : undefined;

    onApply({
      artists: selectedArtists,
      colors: selectedColors,
      sizes: selectedSizes,
      priceMin: priceMin,
      priceMax: priceMax,
    });
  };

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <h3 className={styles.formTitle}>Filters</h3>
        {/* Artist */}
        <div className={styles.filterItems}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Artist:</label>
            {artists.map(artist => (
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
            {colors.map(color => (
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
            {sizes.map(size => (
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
          <button
            type="button"
            className={styles.resetFilterButton}
            onClick={() => {
              setSelectedArtists([]);
              setSelectedColors([]);
              setSelectedSizes([]);
              setPriceMinimum('');
              setPriceMaximum('');
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
};
