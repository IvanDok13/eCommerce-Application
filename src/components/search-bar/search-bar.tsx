import React, { type FC } from 'react';
import styles from './search-bar.module.css';
import { type SearchBarProps } from './search-bar.types';

export const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleClear = (): void => {
    setSearchQuery('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search for a tattoo..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
      {<button className={styles.searchButton}>Search</button>}
      {<button className={styles.resetButton}>Clear</button>}
    </div>
  );
};
