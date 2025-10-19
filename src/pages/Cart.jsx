import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const clp = (n) => n.toLocaleString("es-CL");

export default function Cart() {
  const { cart, inc, dec, remove, total } = useCart();
  const { isAuth } = useAuth();

  return (
    <main>
      <Container className="my-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Carrito de compras</Card.Title>

            {cart.length === 0 ? (
              <p className="mb-0">Tu carrito está vacío.</p>
            ) : (
              <>
                {cart.map((p) => (
                  <Row
                    key={p.id}
                    className="align-items-center py-2 border-bottom"
                  >
                    <Col xs={3} md={2}>
                      <Image src={p.img} alt={p.name} thumbnail />
                    </Col>

                    <Col xs={9} md={4} className="fw-semibold">
                      {p.name}
                    </Col>

                    <Col xs={12} md={3} className="mt-2 mt-md-0">
                      Precio: ${clp(p.price)}
                    </Col>

                    <Col
                      xs={12}
                      md={3}
                      className="d-flex align-items-center gap-2 mt-2 mt-md-0"
                    >
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => dec(p.id)}
                      >
                        −
                      </Button>
                      <span>{p.count}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => inc(p.id)}
                      >
                        +
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => remove(p.id)}
                        title="Eliminar del carrito"
                      >
                        🗑️
                      </Button>
                    </Col>
                  </Row>
                ))}

                <div className="d-flex justify-content-between align-items-center pt-3">
                  <h5 className="mb-0">Total: ${clp(total)}</h5>
                  <Button variant="success" disabled={!isAuth}>
                    Pagar
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
