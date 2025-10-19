import Container from "react-bootstrap/Container";
import RBNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const formatCLP = (n) => n.toLocaleString("es-CL");

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logout } = useAuth();
  const { total } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <RBNavbar expand="md" bg="light" className="border-bottom">
      <Container>
        <RBNavbar.Brand as={NavLink} to="/" className="fw-semibold">
          Pizzería Mamma Mia!
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="main-nav" />
        <RBNavbar.Collapse id="main-nav">
          <div className="ms-auto d-flex gap-2">
            <Button as={NavLink} to="/" variant="outline-secondary" size="sm">
              🍕 Home
            </Button>

            {isAuth ? (
              <>
                <Button as={NavLink} to="/profile" variant="outline-success" size="sm">
                  🔓 Profile
                </Button>
                {location.pathname !== "/profile" && (
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    🔒 Logout
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button as={NavLink} to="/login" variant="outline-primary" size="sm">
                  🔐 Login
                </Button>
                <Button as={NavLink} to="/register" variant="outline-dark" size="sm">
                  🔐 Register
                </Button>
              </>
            )}

            <Button as={NavLink} to="/cart" variant="primary" size="sm">
              🛒 Total: ${formatCLP(total)}
            </Button>
          </div>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}
