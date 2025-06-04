import React, { useEffect } from 'react';
import { fetchProducts, mapProductToRenderData } from './products-api';

const Logger: React.FC = () => {
  useEffect(() => {
    fetchProducts(25)
      .then(products => {
        const productsForRender = products.map(mapProductToRenderData);

        console.log('Mapped Products:', productsForRender);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return <div>Check your console for fetched products</div>;
};

export default Logger;
