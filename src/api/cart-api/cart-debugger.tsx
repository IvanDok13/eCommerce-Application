import { type FC, useEffect } from 'react';
import { addProductToCart, createCart, getActiveCart } from './cart-api';
import { tokenCache } from '@utils/token';

export const CartDebugger: FC = () => {
  useEffect(() => {
    const productIdsToAdd = ['2af7b1d7-3969-4fe9-89e8-4696af709a86'];
    const fetchOrCreateCart = async (): Promise<void> => {
      const tokenStore = tokenCache.get();
      console.log('📦 token:', tokenStore);

      const accessToken = tokenStore.token;
      console.log('Access token:', accessToken);
      try {
        let cart = await getActiveCart();

        if (!cart) {
          console.log('🛒 Cart not found, creating new one...');
          cart = await createCart();
          console.log('🛒 New Cart i:', cart);
        } else {
          console.log('🛒 Active Cart is:', cart);
          // Add products to the cart
          for (const productId of productIdsToAdd) {
            console.log(`➕ Adding product ${productId} to cart...`);
            await addProductToCart(productId, 1);
            console.log(`Product ${productId} added`);
          }
        }
      } catch (error) {
        console.error('Cart Error:', error);
      }
    };

    void fetchOrCreateCart();
  }, []);

  return (
    <div>
      <p>Please don't forget to delete Cart debugger - src/pages/catalog/catalog.tsx - line 122</p>
      <p>Please don't forget to delete Cart debugger - src/pages/catalog/catalog.tsx - line 122</p>
      <p>Please don't forget to delete Cart debugger - src/pages/catalog/catalog.tsx - line 122</p>
      <p>Please don't forget to delete Cart debugger - src/pages/catalog/catalog.tsx - line 122</p>
      <p>Please don't forget to delete Cart debugger - src/pages/catalog/catalog.tsx - line 122</p>
    </div>
  );
};
