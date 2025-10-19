import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../context/AuthContext";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || "");

const DEFAULT_NEXT = "/";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [result, setResult] = useState({ type: "", msg: "" });
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || DEFAULT_NEXT;

  const errors = useMemo(() => {
    const e = {};
    if (!form.email) e.email = "El email es obligatorio.";
    else if (!isEmail(form.email)) e.email = "Formato de email inválido.";

    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6) e.password = "Debe tener al menos 6 caracteres.";

    return e;
  }, [form]);

  const isValidForm = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    if (isAuth && justLoggedIn) {
      setResult({ type: "success", msg: "¡Login exitoso! Redirigiendo..." });
      const t = setTimeout(() => {
        const state = from === "/" ? { welcome: true } : undefined;
        navigate(from, { replace: true, state });
      }, 900);
      return () => clearTimeout(t);
    }
  }, [isAuth, justLoggedIn, navigate, from]);

  useEffect(() => {
    if (result.msg && result.type !== "success") setResult({ type: "", msg: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.email, form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidForm) {
      setResult({ type: "danger", msg: "Credenciales inválidas." });
      return;
    }

    login(form.email);
    setJustLoggedIn(true);
  };

  return (
    <main>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">Iniciar sesión</Card.Title>

                {result.msg && (
                  <Alert variant={result.type} className="mb-3">
                    {result.msg}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="tu@correo.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="loginPass">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Mínimo 6 caracteres"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                      isValid={touched.password && !errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary" disabled={!isValidForm}>
                      Entrar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
