import Stripe from 'stripe';
const stripeKey = process.env.VITE_REACT_APP_STRIPE_SECRET_KEY;
const webhookKey = process.env.VITE_WEBHOOK_SECRET_KEY;
const stripe = new Stripe(stripeKey);

export const handler = async function (event, context) {
  const { body, headers } = event;
  try {
    //   Check that event comes from stripe
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      webhookKey
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const eventObject = stripeEvent.data.object;
      //  all line items that belong to the checkout session
      const items = await stripe.checkout.sessions.listLineItems(
        eventObject.id,
        { expand: ['data.price.product'] }
      );

      // Data for fulfillment
      const { product: productData } = items.data[0].price;
      const { name: productName } = product;

      // TODO Finish sendgrid setup
    }

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(`Stripe webhook failed with ${error}`);
    return {
      StatusCode: 400,
      body: `Webhook error: ${error}`,
    };
  }
};
