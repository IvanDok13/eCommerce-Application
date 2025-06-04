import React, { useEffect } from 'react';
import { apiRoot } from '../api-root';

const ProductsTest: React.FC = () => {
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const response = await apiRoot
          .products()
          .get({ queryArgs: { limit: 50 } })
          .execute();
        console.log('Products response:', response.body.results);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })();
  }, []);

  return <div>Check console for products test results</div>;
};

export default ProductsTest;
