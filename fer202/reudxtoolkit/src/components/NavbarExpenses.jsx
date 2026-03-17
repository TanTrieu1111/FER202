import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function NavbarExpenses() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/images/z7593129544564_ed86c4933269e7fa4dc086fc566931a7.jpg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top me-2"
                    />
                    Personal Budget
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="ms-auto align-items-center">

                        {user && (
                            <>
                                <Navbar.Text className="me-3">
                                    Signed in as <strong>{user.fullName}</strong>
                                </Navbar.Text>

                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarExpenses;