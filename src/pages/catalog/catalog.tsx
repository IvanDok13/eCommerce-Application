import { Header } from '@components/header/header';
import styles from './catalog.module.css';
import { type FC, useState } from 'react';
import { FilterSidebar } from '@components/sidebar/sidebar';
import { SearchBar } from '@components/search-bar/search-bar';
// import { SearchBar } from '@components/searchbar/searchbar'; // TODO: Implement SearchBar
// import { SortControls } from '@components/sortcontrols/sortcontrols'; // TODO: Implement SortControls
// import { ProductList } from '@components/productlist/productlist'; // TODO: Implement ProductList

export const Catalog: FC = () => {
  const [filters, setFilters] = useState({
    // Add filter state fields as needed
  });
  const [sortBy, setSortBy] = useState('price'); // Default sorting by price
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.catalogPage}>
      <Header />
      {/* Main catalog container */}
      <div className={styles.catalogContainer}>
        {/* Sidebar for filters */}
        <FilterSidebar />

        {/* Main content area */}
        <main className={styles.catalogMain}>
          {/* Controls for search and sorting */}
          {<SearchBar />}
          {/* <SortControls sortBy={sortBy} setSortBy={setSortBy} /> */}

          {/* Product list with filters, search, and sorting */}
          {/* <ProductList filters={filters} sortBy={sortBy} searchQuery={searchQuery} /> */}
        </main>
      </div>
    </div>
  );
};
