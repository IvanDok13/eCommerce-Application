import { type FC } from 'react';
import styles from './search-bar.module.css';

export const SearchBar: FC = () => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search for a tattoo..."
        // value={searchQuery}
        // onChange={handleChange}
        className={styles.searchInput}
      />
      {<button className={styles.searchButton}>Search</button>}
      {<button className={styles.resetButton}>Clear</button>}
    </div>
  );
};
