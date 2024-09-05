import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51PAKLvB7VKHUT2sFAGquFqN5yIWdvcEJ9FYB6gYkhOYedDwwE12KZDSTX7yJ6liliESH2uSIOvP1DLbbVOELa1n700Il19E3SQ"
);

export async function getPrices() {
  const response = await stripe.prices.list({ expand: ["data.product"] });

  // will only return prices with an active status
  return response.data.filter((price) => price.product.active);
}

// export async function() {
//     return await getPrices()
// }
