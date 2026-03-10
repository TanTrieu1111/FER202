import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseEdit from "../components/ExpenseEdit";
import Footer from "../components/Footer";

export default function HomePage() {

    const { state } = useContext(AuthContext);

    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {

        const res = await API.get("/expenses");

        const data = res.data.filter(
            e => e.userId === state.user.id
        );

        setExpenses(data);
    };

    const filtered =
        filter === "All"
            ? expenses
            : expenses.filter(e => e.category === filter);

    const total = filtered.reduce(
        (sum, e) => sum + Number(e.amount), 0
    );

    return (

        <>
            <Header />

            <Container className="mt-4">

                {/* TOTAL */}

                <Card className="mb-3">
                    <Card.Body>

                        <h5>Total of Expenses</h5>

                        <h4>
                            {total.toLocaleString()} ₫
                        </h4>

                    </Card.Body>
                </Card>


                <Row>

                    {/* LEFT SIDE */}
                    <Col md={4}>

                        <ExpenseEdit
                            selected={selected}
                            reload={loadExpenses}
                            clearSelected={() => setSelected(null)}
                        />

                    </Col>


                    {/* RIGHT SIDE */}

                    <Col md={8}>

                        {/* FILTER */}

                        <Card className="mb-3">

                            <Card.Body>

                                <h6>Filter</h6>

                                <Form.Select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >

                                    <option>All</option>
                                    <option>Food</option>
                                    <option>Utilities</option>
                                    <option>Entertainment</option>
                                    <option>Mua sắm</option>

                                </Form.Select>

                            </Card.Body>

                        </Card>


                        {/* TABLE */}

                        <Card>

                            <Card.Body>

                                <h6>Expense Management</h6>

                                <ExpenseTable
                                    expenses={filtered}
                                    reload={loadExpenses}
                                    onEdit={(expense) => setSelected(expense)}
                                    clearSelected={() => setSelected(null)}
                                />

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

            <Footer />

        </>

    );

}