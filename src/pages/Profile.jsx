import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/" replace />;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <main>
      <Container className="my-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Mi perfil</Card.Title>
            <p className="mb-3">
              Email: <strong>{user?.email}</strong>
            </p>
            <Button variant="danger" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
