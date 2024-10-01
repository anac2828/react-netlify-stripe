import { Button, Navbar, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useCart } from '../providers/CartProvider';
import stripeCheckout from '../helpers/stripeCheckout';
import CartProduct from './CartProduct';

function NavbarComponent() {
  const cart = useCart();
  const [show, setShow] = useState(false);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleCheckout = async () => {
    const items = cart.items.map((item) => {
      return { price: item.id, quantity: item.quantity };
    });
    stripeCheckout(items);
  };

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Netlify eStore</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => setShow(true)}>
            Cart {productsCount} Items
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((item) => (
                <CartProduct
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                />
              ))}

              <h1>Total: ${cart.totalCost.toFixed(2)}</h1>
              <Button variant='success' onClick={handleCheckout}>
                Purchase Items
              </Button>
            </>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
