const stripeCheckout = async (data) => {
  // After the createCheckoutSession funcition is done, the browser will redirect the user to the stripe checkout page
  const stripe = await fetch('/.netlify/functions/createCheckoutSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const stripeURL = await stripe.json();
  window.location.assign(stripeURL);
};

export default stripeCheckout;
