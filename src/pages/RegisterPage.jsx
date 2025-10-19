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

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [result, setResult] = useState({ type: "", msg: "" });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.state?.from?.pathname || DEFAULT_NEXT;

  const errors = useMemo(() => {
    const e = {};
    if (!form.email) e.email = "El email es obligatorio.";
    else if (!isEmail(form.email)) e.email = "Formato de email inválido.";

    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6) e.password = "Debe tener al menos 6 caracteres.";

    if (!form.confirmPassword) e.confirmPassword = "Debes confirmar la contraseña.";
    else if (form.password && form.confirmPassword !== form.password)
      e.confirmPassword = "Las contraseñas no coinciden.";

    return e;
  }, [form]);

  const isValidForm = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    if (result.msg) setResult({ type: "", msg: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.email, form.password, form.confirmPassword]);

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
    setTouched({ email: true, password: true, confirmPassword: true });

    if (!isValidForm) {
      setResult({ type: "danger", msg: "Corrige los errores e intenta nuevamente." });
      return;
    }

    login(form.email);
    navigate(next, { replace: true, state: { welcome: true } });
  };

  const passLen = form.password.length;

  return (
    <main>
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">Crear cuenta</Card.Title>

                {result.msg && (
                  <Alert variant={result.type} className="mb-3">
                    {result.msg}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="regEmail">
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

                  <Form.Group className="mb-3" controlId="regPass">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Mínimo 6 caracteres"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                      isValid={touched.password && !errors.password}
                    />
                    <Form.Text>
                      {passLen === 0
                        ? "Escribe tu contraseña."
                        : `Largo actual: ${passLen} ${passLen < 6 ? "(necesitas 6+)" : "✅"}`}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="regPass2">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      isValid={touched.confirmPassword && !errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary" disabled={!isValidForm}>
                      Crear cuenta
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
