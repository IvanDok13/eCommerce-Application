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
import { fetchProducts, mapProductToRenderData } from '@api/products-api/products-api';
import type { CategoryTreeItem } from '@api/category-api/category-api.types';
import type { ProductRenderData } from '@api/products-api/products-api.types';
import type { Filters } from '@components/product-list/product-list.types';

export const Catalog: FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[] | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [products, setProducts] = useState<ProductRenderData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    artists: [],
    colors: [],
    sizes: [],
    priceMin: '',
    priceMax: '',
  });

  // Categories Loading
  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        const tree = await fetchCategoryTree();
        setCategoryTree(tree);

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
          setCurrentCategoryId(matchedCategory ? matchedCategory.id : null);
        }
      } catch (error) {
        console.error('Failed to fetch category tree:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    void loadCategories();
  }, [categorySlug, navigate]);

  // all Products Loading
  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      setLoadingProducts(true);
      try {
        const fetchedProducts = await fetchProducts(25);
        const mappedProducts = fetchedProducts.map(mapProductToRenderData);
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    void loadProducts();
  }, []);

  if (loadingCategories) return <div>Loading categories...</div>;
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

          {loadingProducts ? <div>Loading products...</div> : <ProductList products={products} />}
        </div>
      </div>
    </div>
  );
};
