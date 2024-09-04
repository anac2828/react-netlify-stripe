import { Button, Navbar, Modal } from "react-bootstrap";
import { useCart } from "../CartProvider";
import { useState } from "react";
import CartProduct from "./CartProduct";

function NavbarComponent() {
  const cart = useCart();
  const [show, setShow] = useState(false);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Netlify eStore</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
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
              <Button variant="success">Purchase Items</Button>
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
