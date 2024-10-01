import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider';
import NavbarComponent from './components/Navbar';
import Store from './pages/Store';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import { ProductProvider } from './providers/ProductProvider';

function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <Container>
            <NavbarComponent />
            <BrowserRouter>
              <Routes>
                <Route index element={<Store />} />
                <Route path='success' element={<Success />} />
                <Route path='cancel' element={<Cancel />} />
              </Routes>
            </BrowserRouter>
          </Container>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
