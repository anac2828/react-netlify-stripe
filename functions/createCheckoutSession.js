import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_REACT_APP_STRIPE_SECRET_KEY);

export const handler = async function (event) {
  const items = JSON.parse(event.body);
  console.log(items);
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: 'http://localhost:8888/success',
    cancel_url: event.headers.referer,
    // cancel_url: "http://localhost:8888/cancel",
  });

  // Browser will redirect to the stripe checkout session
  return {
    statusCode: 200,
    body: JSON.stringify(session.url),
  };
};
