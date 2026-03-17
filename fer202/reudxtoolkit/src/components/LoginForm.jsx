import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginThunk } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";

function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setError] = useState({});
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";

        if (username && username.includes("@")) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                newErrors.username = "Invalid email format";
            }
        }

        if (password && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        // gọi redux thunk
        const result = await dispatch(
            loginThunk({ username, password })
        );

        if (loginThunk.fulfilled.match(result)) {

            const user = result.payload;

            // kiểm tra role
            if (user.role !== "admin") {
                setError({ message: "Access denied. Admins only." });
                return;
            }

            // kiểm tra account locked
            if (user.status === "locked") {
                setError({ message: "Access is denied. Your account is locked." });
                return;
            }

            console.log("Login successful:", user);

            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate("/dashboard");
            }, 3000);

        }
    };

    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setError({});
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        setError((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    return (
        <Container className="mt-5">

            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="shadow-sm">

                        <Card.Header className="bg-white py-3">
                            <h3 className="text-center mb-0">Login</h3>
                        </Card.Header>

                        <Card.Body className="p-4">

                            {(error || errors.message) && (
                                <Alert variant="danger">
                                    {error || errors.message}
                                </Alert>
                            )}

                            <Form onSubmit={handleLogin}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Username or email</Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username or email"
                                        value={username}
                                        onChange={handleInputChange(setUsername, "username")}
                                        disabled={loading}
                                        isInvalid={!!errors.username}
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
                                        value={password}
                                        onChange={handleInputChange(setPassword, "password")}
                                        disabled={loading}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex gap-2 mt-4">

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-fill"
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Login"}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="flex-fill"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>

                                </div>

                            </Form>

                        </Card.Body>

                    </Card>
                </Col>
            </Row>

            <ModalConfirm
                show={showModal}
                title="Login Successful"
                message="You have successfully logged in. Redirecting to dashboard..."
                onConfirm={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
            />

        </Container>
    );
}

export default LoginForm;