import React, { useEffect } from 'react';
import { fetchProducts } from './products-api';

const Logger: React.FC = () => {
  useEffect(() => {
    fetchProducts(6)
      .then(products => {
        products.forEach(product => {
          const id = product.id;
          const name = product.masterData.current.name['en-US'];
          const priceCents = product.masterData.current.masterVariant.prices?.[0]?.value.centAmount;
          const price = priceCents ? priceCents / 100 : 'N/A';
          const imageUrl = product.masterData.current.masterVariant.images?.[0]?.url;

          console.log(`Product id: ${id}`);
          console.log(`Name: ${name}`);
          console.log(`Price: $${price}`);
          console.log(`Image URL: ${imageUrl}`);
          console.log('-----------------------------------');
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return <div>Check your console for fetched products</div>;
};

export default Logger;
