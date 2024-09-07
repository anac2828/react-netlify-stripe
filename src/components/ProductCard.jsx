import { Card, Button, Form, Row } from "react-bootstrap";
import { useCart } from "../providers/CartProvider";

function ProductCard({ product, price }) {
  const { items, addOneItem, removeOneItem, deleteFromCart } = useCart();
  const currentItem = items.find((item) => item.id === price.id);
  const quantity = currentItem === undefined ? 0 : currentItem.quantity;
  const productPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleRemoveOne = () => {
    if (quantity === 1) deleteFromCart(price.id);
    removeOneItem(price.id);
  };

  const handleCheckout = async () => {
    // After the createCheckoutSession funcition is done, the browser will redirect the user to the stripe checkout page
    const stripe = await fetch("/.netlify/functions/createCheckoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: price.id }),
    });
    const stripeURL = await stripe.json();
    window.location.assign(stripeURL);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Img
          variant="top"
          src={product.images[0]}
          height="175px"
          className="card-image"
        />
        <Card.Title className="my-3">{product.name}</Card.Title>
        <Card.Text>{productPrice.format(price.unit_amount / 100)}</Card.Text>
        {quantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {quantity}
              </Form.Label>
              <div>
                <Button
                  onClick={() => addOneItem(price.id)}
                  sm="6"
                  className="mx-2"
                >
                  +
                </Button>
                <Button onClick={handleRemoveOne} sm="6" className="mx-2">
                  -
                </Button>
              </div>
            </Form>
            <Button
              variant="danger"
              onClick={() => deleteFromCart(price.id)}
              className="my-3"
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => addOneItem(price.id)}>
              Add to Cart
            </Button>
            <Button
              variant="success"
              onClick={handleCheckout}
              className="mx-2 my-2"
            >
              Buy Now
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
