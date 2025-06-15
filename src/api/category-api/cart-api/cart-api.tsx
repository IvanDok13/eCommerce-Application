import type { Cart, CartDraft } from '@commercetools/platform-sdk';
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
    console.error('❌ Error getting active cart:', error);
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
    console.error('❌ Error creating cart:', error);
    throw error;
  }
}

// export async function getActiveCart(
//   email: string = 'po12!chta@pochta.com',
//   password: string = 'Po12!chta@pochta.com'
// ): Promise<Cart | null> {
//   try {
//     const response = await authRequestClient(email, password).me().activeCart().get().execute();

//     return response.body;
//   } catch (error: unknown) {
//     if (error instanceof Error && 'statusCode' in error && error.statusCode === 404) {
//       return null;
//     }
//     throw error;
//   }
// }

// export async function createCart( email: string = 'po12!chta@pochta.com',
//   password: string = 'Po12!chta@pochta.com'): Promise<Cart> {
//   try {
//     const draft: CartDraft = {
//       currency: 'USD',
//       country: 'US',
//     };

//     const response = await authRequestClient(email, password).me().carts().post({ body: draft }).execute();

//     return response.body;
//   } catch (error : unknown) {
//     if (error instanceof Error && 'statusCode' in error) {
//       console.error('❌ Error creating cart:', error);
//     }
//     throw error;
//   }
// }
