import { Row, Col } from "react-bootstrap";
import { productsArray } from "../data/productsStore";
import ProductCard from "../components/ProductCard";

function Store() {
  return (
    <>
      <h1 className="p-3 text-center">Welcome to the store!</h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, index) => (
          <Col align="center" key={index}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
