import { Button } from 'react-bootstrap';
import { useProducts } from '../providers/ProductProvider';
import { useCart } from '../providers/CartProvider';
import formatNumber from '../helpers/formatNumber';

function CartProduct({ id, quantity }) {
  const { getProductData } = useProducts();
  const { deleteFromCart, addOneItem, removeOneItem } = useCart();
  const productData = getProductData(id);

  const handleRemoveOne = () => {
    console.log(id);
    if (quantity === 1) deleteFromCart(id);
    removeOneItem(id);
  };

  return (
    <>
      <div className='mb-3'>
        <h3>{productData.product.name}</h3>
        <p>{quantity} total</p>
        <p>{formatNumber((productData.unit_amount / 100) * quantity)}</p>
        <img src={productData.product.images[0]} width='100px' />
      </div>

      {/* ADD OR REMOVE ONE FROM CART */}
      <div className='mb-3'>
        <Button onClick={() => addOneItem(id)} sm='6' className='mx-2'>
          +
        </Button>
        <Button onClick={handleRemoveOne} sm='6' className='mx-2'>
          -
        </Button>
      </div>

      {/* REMOVE FROM CART */}
      <Button size='sm' variant='danger' onClick={() => deleteFromCart(id)}>
        Remove
      </Button>
      <hr />
    </>
  );
}

export default CartProduct;
