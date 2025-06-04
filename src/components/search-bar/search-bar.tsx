import React, { useState, type FC } from 'react';
import styles from './search-bar.module.css';
import { type SearchBarProps } from './search-bar.types';

export const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSearch = (): void => {
    setSearchQuery(inputValue.trim());
  };

  const handleClear = (): void => {
    setInputValue('');
    setSearchQuery('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search for a tattoo..."
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
      <button onClick={handleClear} className={styles.resetButton}>
        Clear
      </button>
    </div>
  );
};
