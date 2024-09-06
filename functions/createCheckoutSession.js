import Stripe from "stripe";

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

export const handler = async function (event) {
  const { priceId } = JSON.parse(event.body);
  console.log(priceId);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8888/success",
    cancel_url: event.headers.referer,
    // cancel_url: "http://localhost:8888/cancel",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
