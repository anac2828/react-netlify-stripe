import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
// import { productsArray } from "../data/productsStore";
import ProductCard from "../components/ProductCard";
import { getPrices } from "../services/stripe";

function Store() {
  const [stripePrices, setStripePrices] = useState([]);

  useEffect(() => {
    async function getStripePrices() {
      const prices = await getPrices();
      setStripePrices(prices);
    }
    getStripePrices();
  }, [setStripePrices]);

  return (
    <>
      <h1 className="p-3 text-center">Welcome to the store!</h1>
      <Row xs={1} md={3} className="g-4">
        {stripePrices.map((price, index) => (
          <Col align="center" key={index}>
            <ProductCard product={price.product} price={price} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
