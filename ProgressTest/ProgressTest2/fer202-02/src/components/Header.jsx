import { Navbar, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const { state, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (

        <Navbar bg="white" className="border-bottom">

            <Container>

                <Navbar.Brand>
                    <img
                        src="/images/z7593129544564_ed86c4933269e7fa4dc086fc566931a7.jpg"
                        alt="logo"
                        width="50"
                        height="50"
                        className="me-2 rounded-circle"
                    />
                    PersonalBudget
                </Navbar.Brand>

                <div className="text-dark">

                    Signed in as {state.user?.fullName}

                    <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-3"
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </div>

            </Container>

        </Navbar>

    )

}