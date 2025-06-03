import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './catalog.module.css';

import { Header } from '@components/header/header';
import { FilterSidebar } from '@components/sidebar/sidebar';
import { SearchBar } from '@components/search-bar/search-bar';
import { SortControls } from '@components/sort-controls/sort-controls';
import { ProductList } from '@components/product-list/product-list';
import { Breadcrumbs } from '@components/breadcrumbs/breadcrumbs';

import { fetchCategoryTree, findCategoryBySlug, findRootCategory } from '@api/category-api/category-api';
import { type CategoryTreeItem } from '@api/category-api/category-api.types';
import { type Filters } from '@components/product-list/product-list.types';

export const Catalog: FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[] | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    artists: [],
    colors: [],
    sizes: [],
    priceMin: '',
    priceMax: '',
  });

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        const tree = await fetchCategoryTree();
        setCategoryTree(tree);
        console.log('categorySlug from URL:', categorySlug);

        if (!categorySlug) {
          const rootCategory = findRootCategory(tree);
          const rootSlug = rootCategory?.slug?.['en-US'];
          if (rootSlug) {
            navigate(`/catalog/${rootSlug}`, { replace: true });
            return;
          }
        }

        if (categorySlug) {
          const matchedCategory = findCategoryBySlug(tree, categorySlug);
          if (matchedCategory) {
            setCurrentCategoryId(matchedCategory.id);
          } else {
            console.warn('Category not found for slug:', categorySlug);
            setCurrentCategoryId(null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch category tree:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadCategories();
  }, [categorySlug, navigate]);

  if (loading) return <div>Loading categories...</div>;
  if (!categoryTree || categoryTree.length === 0) return <div>No categories found</div>;
  if (!currentCategoryId) return <div>Category not found</div>;

  return (
    <div className={styles.catalogPage}>
      <Header />
      <div className={styles.catalogContainer}>
        <FilterSidebar onApply={setFilters} />
        <div className={styles.catalogMain}>
          <div className={styles.catalogControls}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <SortControls sortBy={sortBy} setSortBy={setSortBy} />
            <Breadcrumbs categoryId={currentCategoryId} categoryTree={categoryTree} />
          </div>
          <ProductList filters={filters} sortBy={sortBy} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};
