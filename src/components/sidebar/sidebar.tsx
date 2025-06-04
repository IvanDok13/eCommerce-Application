import React, { type FC, useMemo, useState } from 'react';
import styles from './sidebar.module.css';
import type { FilterSidebarProps } from './sidebar.types';

export const FilterSidebar: FC<FilterSidebarProps> = ({ onApply, products }) => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMinimum, setPriceMinimum] = useState('');
  const [priceMaximum, setPriceMaximum] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);

  // getting unique values for artists, colors, sizes, and placements
  const artists = useMemo(() => {
    const unique = new Set(products.map(p => p.artist).filter(Boolean));
    return [...unique].sort();
  }, [products]);

  const colors = useMemo(() => {
    const unique = new Set<string>();
    products.forEach(p => {
      const color = p.color?.toLowerCase() ?? '';
      if (color.includes('black') || color.includes('grey') || color === 'black-white') {
        unique.add('black-white');
      } else if (color) {
        unique.add('colored');
      }
    });
    return [...unique].sort();
  }, [products]);

  const sizes = useMemo(() => {
    const unique = new Set(products.map(p => p.size).filter(Boolean));
    return [...unique].sort();
  }, [products]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const priceMin = priceMinimum ? Number(priceMinimum) : undefined;
    const priceMax = priceMaximum ? Number(priceMaximum) : undefined;

    setFiltersApplied(true);

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

              if (filtersApplied) {
                setFiltersApplied(false);
                onApply({});
              }
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
};
