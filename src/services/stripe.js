import Stripe from "stripe";

export const stripe = new Stripe(
  import.meta.env.VITE_REACT_APP_STRIPE_SECRET_KEY
);

export async function getPrices() {
  const response = await stripe.prices.list({ expand: ["data.product"] });

  // will only return prices with an active status
  return response.data.filter((price) => price.product.active);
}

// export async function() {
//     return await getPrices()
// }
