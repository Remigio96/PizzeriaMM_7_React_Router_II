import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CardPizza({ id, name, price, ingredients, img }) {
  const { add, cart } = useCart();
  const clp = (n) => n.toLocaleString("es-CL");


  const item = cart.find(p => p.id === id);

  return (
    <Card className="h-100 shadow-sm position-relative">
      {item && item.count > 0 && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "#dc3545",
            color: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.9rem",
            fontWeight: "bold",
            boxShadow: "0 0 4px rgba(0,0,0,0.4)",
          }}
        >
          {item.count}
        </div>
      )}

      <Card.Img
        variant="top"
        src={img}
        alt={name}
        style={{ objectFit: "cover", height: 180 }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>

        <div className="mb-2">
          <span className="fw-semibold">Ingredientes:</span>
          <ul className="mb-0 ps-3">
            {ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>

        <h6 className="mt-auto mb-3">Precio: ${clp(price)}</h6>

        <div className="d-flex gap-2">
          <Button
            as={NavLink}
            to={`/pizza/${id}`}
            variant="outline-secondary"
            className="w-50"
          >
            Ver más
          </Button>

          <Button
            variant="primary"
            className="w-50"
            onClick={() => add({ id, name, price, img })}
          >
            Añadir
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
