'use server';

import { createCart, addToCart } from '@/lib/shopify';
import { cookies } from 'next/headers';

export async function directCheckout(merchandiseId: string, variantTitle?: string) {
  try {
    const cookieStore = await cookies();

    // Always create a fresh cart for direct checkout from inventory page
    // This ensures only the selected variant goes to checkout
    const cart = await createCart();

    // Set the new cart cookie if cart ID exists
    if (cart.id) {
      cookieStore.set('cartId', cart.id);
    }

    // Add ONLY the selected variant to the fresh cart
    const updatedCart = await addToCart([
      {
        merchandiseId,
        quantity: 1
      }
    ]);

    // Return the checkout URL with variant info
    return {
      success: true,
      checkoutUrl: updatedCart.checkoutUrl,
      variantTitle: variantTitle || 'Default'
    };
  } catch (error) {
    console.error('Error creating checkout:', error);
    return {
      success: false,
      error: 'Failed to create checkout. Please try again.'
    };
  }
}
