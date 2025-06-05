import React, { type FC } from 'react';
import styles from './sort-controls.module.css';
import { type SortControlsProps } from './sort-controls.types';
import type { SortByOption } from '@api/products-api/products-api.types';

const isSortByOption = (value: string): value is SortByOption => {
  const sortOptions: string[] = ['price', '-price', 'name', '-name'];
  return sortOptions.includes(value);
};

export const SortControls: FC<SortControlsProps> = ({ sortBy, setSortBy }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    if (isSortByOption(value)) {
      setSortBy(value);
    }
  };

  return (
    <div className={styles.sortControlsContainer}>
      <label htmlFor="sort" className={styles.sortLabel}>
        Sort by:
      </label>
      <select id="sort" value={sortBy} onChange={handleChange} className={styles.sortSelect}>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
        <option value="-name">Name: Z to A</option>
      </select>
    </div>
  );
};
