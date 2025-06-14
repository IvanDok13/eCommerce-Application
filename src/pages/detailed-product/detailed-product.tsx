import { fetchProducts, getRenderArray } from '@api/products-api/products-api';
import type { ProductRenderData } from '@api/products-api/products-api.types';
import { ImageSlider } from '@components/slider/slider';
import { type FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './detailed-product.module.css';

interface Props {
  productId: string;
}

export const DetailedProductWrapper: FC = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) return <div>Product ID not specified</div>;

  return <DetailedProduct productId={productId} />;
};

export const DetailedProduct: FC<Props> = ({ productId }) => {
  const emptyProduct: ProductRenderData = {
    id: '',
    name: '',
    slug: '',
    price: 0,
    imageUrls: [],
    artist: '',
    size: '',
    color: '',
    description:
      'An error occurred, so a fallback product has been loaded. We will try to fix the issue as soon as possible. Please come back soon',
  };
  const [product, setProduct] = useState<ProductRenderData>(emptyProduct);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      try {
        const products = await fetchProducts(50);
        const renderProducts = getRenderArray(products, {});
        const matched = renderProducts.find(p => p.id === productId);
        setProduct(matched || emptyProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  if (loading) return <div className={styles.productPage}>Loading...</div>;
  if (!product) return <div className={styles.productPage}>Product not found.</div>;

  return (
    <div className={styles.productPage}>
      <div className={styles.productInfoWrapper}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={styles.productArtist}>Artist: {product.artist || 'Unknown'}</p>
        <p className={styles.productSize}>Size: {product.size.length > 0 ? product.size : 'Not specified'}</p>
        <p className={styles.productColor}>Color: {product.color || 'Not specified'}</p>
        <p className={styles.productDescription}>
          About this tattoo: {product.description || 'No description available.'}
        </p>
      </div>

      <ImageSlider imageUrls={product.imageUrls} altBase={product.name} />

      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>Price: </span>
        <span className={styles.priceValue}>${(product.price / 100).toFixed(2)}</span>
      </div>
      {/* <div className={styles.modalPlaceholder}>
        <span>Modal placeholder</span>
      </div> */}
    </div>
  );
};
