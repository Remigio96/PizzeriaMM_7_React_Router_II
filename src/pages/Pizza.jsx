import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../context/CartContext";

const clp = (n) => n.toLocaleString("es-CL");

export default function Pizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    const fetchPizza = async () => {
      const res = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      const data = await res.json();
      setPizza(data);
    };
    fetchPizza();
  }, [id]);

  if (!pizza) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <main>
      <Container className="my-4">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Img
            variant="top"
            src={pizza.img}
            alt={pizza.name}
            style={{ objectFit: "cover", height: "320px" }}
          />
          <Card.Body>
            <Card.Title>{pizza.name}</Card.Title>
            <h5>Precio: ${clp(pizza.price)}</h5>
            <p>{pizza.desc}</p>
            <ul>
              {pizza.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                ← Volver
              </Button>
              <Button variant="primary" onClick={() => add(pizza)}>
                Añadir
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
