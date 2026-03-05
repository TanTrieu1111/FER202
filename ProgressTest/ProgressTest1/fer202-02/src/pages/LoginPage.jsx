import { useState, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import MessageModal from "../components/MessageModal";

function LoginPage() {
  const { login } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.username) {
      newErrors.username = "Username or Email is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setServerError("");

    if (!validate()) return;

    const res = await api.get("/accounts");

    const user = res.data.find(
      (acc) =>
        (acc.username === form.username ||
          acc.email === form.username) &&
        acc.password === form.password
    );

    if (!user) {
      return setServerError(
        "Invalid username/email or password!"
      );
    }

    if (user.role !== "admin") {
      return setServerError(
        "Access denied. Only admin users can log in."
      );
    }

    if (user.status === "locked") {
      return setServerError(
        "Account is locked. Please contact admin."
      );
    }

    // ✅ DÙNG login() chuẩn
    login(user);
    setShowModal(true);
  };

  const handleCancel = () => {
    setForm({ username: "", password: "" });
    setErrors({});
    setServerError("");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px" }}>
        <Card.Header className="text-center fw-bold fs-4">
          Login
        </Card.Header>

        <Card.Body>

          {serverError && (
            <div className="alert alert-danger">
              {serverError}
            </div>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username or email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username or email"
                value={form.username}
                isInvalid={!!errors.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={form.password}
                isInvalid={!!errors.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                className="w-100"
                onClick={handleLogin}
              >
                Login
              </Button>

              <Button
                variant="secondary"
                className="w-100"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <a href="#">Don’t have an account? Sign up.</a>
          </div>
        </Card.Body>
      </Card>

      <MessageModal
        show={showModal}
        message={`Welcome, ${form.username}! Login successful.`}
        onClose={() => navigate("/accounts")}
      />
    </Container>
  );
}

export default LoginPage;