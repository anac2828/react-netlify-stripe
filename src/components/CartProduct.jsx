import { Button } from "react-bootstrap";
import { getProductData } from "../data/productsStore";
import { useCart } from "../CartProvider";

function CartProduct({ id, quantity }) {
  const productData = getProductData(id);
  const { deleteFromCart } = useCart();

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>

      <Button
        size="sm"
        variant="danger"
        onClick={() => deleteFromCart(productData.id)}
      >
        Remove
      </Button>
      <hr />
    </>
  );
}

export default CartProduct;
