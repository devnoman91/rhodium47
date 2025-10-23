'use server';

import { createCart, addToCart, getProducts } from '@/lib/shopify';
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

    // Fetch all products to find the "Due Today" product by name
    const allProducts = await getProducts({ first: 100 });
    const dueTodayProduct = allProducts.find((product: any) => 
      product.title.toLowerCase().includes('due today')
    );

    // Prepare cart items - the selected product + the "Due Today" product if found
    const cartItems = [
      {
        merchandiseId,
        quantity: 1
      }
    ];

    // Add the "Due Today" product as a second item if found
    if (dueTodayProduct && dueTodayProduct.variants && dueTodayProduct.variants.length > 0) {
      cartItems.push({
        merchandiseId: dueTodayProduct.variants[0].id, // Use the first variant
        quantity: 1
      });
    }

    const updatedCart = await addToCart(cartItems);

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
