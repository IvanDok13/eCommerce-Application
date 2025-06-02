import { Header } from '@components/header/header';
import styles from './catalog.module.css';
import { type FC, useState } from 'react';
import { FilterSidebar } from '@components/sidebar/sidebar';
import { SearchBar } from '@components/search-bar/search-bar';
import { SortControls } from '@components/sort-controls/sort-controls';
import { ProductList } from '@components/product-list/product-list';

export const Catalog: FC = () => {
  const [filters, setFilters] = useState({
    // Add filter state fields as needed
  });
  const [sortBy, setSortBy] = useState('price'); // Default sorting by price
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.catalogPage}>
      <Header />
      <div className={styles.catalogContainer}>
        <FilterSidebar />
        {/* Main content area */}
        <div className={styles.catalogMain}>
          <div className={styles.catalogControls}>
            {<SearchBar />}
            {<SortControls sortBy={sortBy} setSortBy={setSortBy} />}
          </div>
          {<ProductList filters={filters} sortBy={sortBy} searchQuery={searchQuery} />}
        </div>
      </div>
    </div>
  );
};
