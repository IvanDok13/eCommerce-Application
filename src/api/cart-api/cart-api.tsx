import type { Cart, CartDraft, LineItem, MyCartUpdate } from '@commercetools/platform-sdk';
import { getApiClient } from '@api/client-api';

export async function getActiveCart(): Promise<Cart | null> {
  try {
    const apiClient = getApiClient();
    const response = await apiClient.me().activeCart().get().execute();
    return response.body;
  } catch (error: unknown) {
    if (error instanceof Error && 'statusCode' in error && error.statusCode === 404) {
      return null;
    }
    console.error('Error getting active cart:', error);
    throw error;
  }
}

export async function createCart(): Promise<Cart> {
  try {
    const apiClient = getApiClient();

    const draft: CartDraft = {
      currency: 'USD',
      country: 'US',
    };

    const response = await apiClient.me().carts().post({ body: draft }).execute();
    return response.body;
  } catch (error: unknown) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function getCartLineItems(): Promise<LineItem[]> {
  const cart = await getActiveCart();
  return cart?.lineItems ?? [];
}

export async function addProductToCart(productId: string, quantity: number = 1): Promise<Cart> {
  const apiClient = getApiClient();

  // Get or create cart
  let cart = await getActiveCart();
  if (!cart) {
    cart = await createCart();
  }

  // Prepare the update action for adding a line item
  const updateBody: MyCartUpdate = {
    version: cart.version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        quantity,
      },
    ],
  };

  const response = await apiClient.me().carts().withId({ ID: cart.id }).post({ body: updateBody }).execute();

  return response.body;
}
