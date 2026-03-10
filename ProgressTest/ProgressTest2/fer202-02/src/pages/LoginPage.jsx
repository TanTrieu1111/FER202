import { useState, useContext } from "react";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [success, setSuccess] = useState("");

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setUsernameError("");
        setPasswordError("");
        setSuccess("");

        let valid = true;

        if (!username) {
            setUsernameError("Username is required");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        }

        if (password && password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        }

        if (!valid) return;

        const res = await API.get("/users");

        const user = res.data.find(
            u => u.username === username && u.password === password
        );

        if (user) {

            setSuccess("Login successful");

            dispatch({ type: "LOGIN", payload: user });

            setTimeout(() => {
                navigate("/home");
            }, 1000);

        } else {

            setPasswordError("Invalid username or password");

        }
    };

    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setUsernameError("");
        setPasswordError("");
        setSuccess("");
    };

    return (

        <Container className="d-flex justify-content-center mt-5">

            <Card style={{ width: "420px" }}>

                <Card.Body>

                    <h2 className="text-center mb-4">Login</h2>

                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleLogin}>

                        {/* USERNAME */}

                        <Form.Group className="mb-3">

                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                placeholder="Enter username"
                                value={username}
                                isInvalid={usernameError}
                                onChange={e => setUsername(e.target.value)}
                            />

                            <Form.Control.Feedback type="invalid">
                                {usernameError}
                            </Form.Control.Feedback>

                        </Form.Group>


                        {/* PASSWORD */}

                        <Form.Group className="mb-3">

                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                isInvalid={passwordError}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <Form.Text>
                                (at least 6 characters)
                            </Form.Text>

                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>

                        </Form.Group>


                        {/* BUTTON */}

                        <Row>

                            <Col>
                                <Button
                                    type="submit"
                                    className="w-100"
                                >
                                    Login
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </Col>

                        </Row>

                    </Form>

                </Card.Body>

            </Card>

        </Container>

    );

}