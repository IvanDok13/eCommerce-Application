import { type FC } from 'react';
import styles from './sort-controls.module.css';
import { type SortControlsProps } from './sort-controls.types';

export const SortControls: FC<SortControlsProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className={styles.sortControlsContainer}>
      <label htmlFor="sort" className={styles.sortLabel}>
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        // onChange={handleChange}
        className={styles.sortSelect}
      >
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
        <option value="-name">Name: Z to A</option>
      </select>
    </div>
  );
};
