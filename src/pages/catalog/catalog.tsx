import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './catalog.module.css';

import { Header } from '@components/header/header';
import { FilterSidebar } from '@components/sidebar/sidebar';
import { SearchBar } from '@components/search-bar/search-bar';
import { SortControls } from '@components/sort-controls/sort-controls';
import { Breadcrumbs } from '@components/breadcrumbs/breadcrumbs';
import { ProductCard } from '@components/product-card/product-card';

import {
  fetchCategoryTree,
  findCategoryBySlug,
  findRootCategory,
  getCategoryAndChildrenIds,
} from '@api/category-api/category-api';

import { fetchProducts, getRenderArray } from '@api/products-api/products-api';
import { getCartLineItems } from '@api/cart-api/cart-api';

import type { CategoryTreeItem } from '@api/category-api/category-api.types';
import type { ProductRenderData, SortByOption } from '@api/products-api/products-api.types';
import type { Filters } from '@components/product-list/product-list.types';

export const Catalog: FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[] | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [products, setProducts] = useState<ProductRenderData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [sortBy, setSortBy] = useState<SortByOption>('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    artists: [],
    colors: [],
    sizes: [],
    priceMin: undefined,
    priceMax: undefined,
  });

  const [cartMap, setCartMap] = useState<Record<string, number>>({});

  // Load categories
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

  // Load products
  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      setLoadingProducts(true);
      try {
        let categoryIds: string[] = [];

        if (currentCategoryId && categoryTree) {
          categoryIds = getCategoryAndChildrenIds(currentCategoryId, categoryTree);
        }

        const fetchedProducts = await fetchProducts(25, categoryIds);

        const mappedProducts = getRenderArray(fetchedProducts, {
          limit: 25,
          filters,
          sortBy,
          searchQuery,
          categoryId: undefined,
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    void loadProducts();
  }, [filters, sortBy, searchQuery, currentCategoryId, categoryTree]);

  // Load cart items
  useEffect(() => {
    const fetchCartItems = async (): Promise<void> => {
      try {
        const items = await getCartLineItems();
        const map: Record<string, number> = {};

        items.forEach(item => {
          if (item.productId) {
            map[item.productId] = item.quantity;
          }
        });

        setCartMap(map);
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    };

    void fetchCartItems();
  }, []);

  if (loadingCategories) return <div>Loading categories...</div>;
  if (!categoryTree || categoryTree.length === 0) return <div>No categories found</div>;
  if (!currentCategoryId) return <div>Category not found</div>;

  return (
    <div className={styles.catalogPage}>
      <Header />
      <div className={styles.catalogContainer}>
        <FilterSidebar onApply={setFilters} products={products} />
        <div className={styles.catalogMain}>
          <div className={styles.catalogControls}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <SortControls sortBy={sortBy} setSortBy={setSortBy} />
            <Breadcrumbs categoryId={currentCategoryId} categoryTree={categoryTree} />
          </div>

          {loadingProducts ? (
            <div>Loading products...</div>
          ) : (
            <div className={styles.productList}>
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  artist={product.artist}
                  color={product.color}
                  size={product.size}
                  imageUrls={product.imageUrls}
                  isInCart={cartMap[product.id] != null}
                  quantityInCart={cartMap[product.id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
