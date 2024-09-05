import { Card, Button, Form, Row } from "react-bootstrap";
import { useCart } from "../providers/CartProvider";

function ProductCard({ product, price }) {
  const { items, addOneItem, removeOneItem, deleteFromCart } = useCart();
  const currentItem = items.find((item) => item.id === product.id);
  const quantity = currentItem === undefined ? 0 : currentItem.quantity;
  const productPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleRemoveOne = () => {
    if (quantity === 1) deleteFromCart(product.id);
    removeOneItem(product.id);
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
                  onClick={() => addOneItem(product.id)}
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
              onClick={() => deleteFromCart(product.id)}
              className="my-3"
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => addOneItem(product.id)}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
