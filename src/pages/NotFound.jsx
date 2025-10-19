import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function NotFound() {
  return (
    <main>
      <Container className="text-center my-5">
        <h1 className="display-4">404 - Página no encontrada</h1>
        <p>La ruta que buscaste no existe.</p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
