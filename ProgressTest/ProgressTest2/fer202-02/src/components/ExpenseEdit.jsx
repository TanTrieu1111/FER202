import { useState, useEffect, useContext } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function ExpenseEdit({ selected, reload, clearSelected }) {

    const { state } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {

        if (selected) {

            setName(selected.name);
            setAmount(selected.amount);
            setCategory(selected.category);
            setDate(selected.date);

        }

    }, [selected]);



    const reset = () => {

        setName("");
        setAmount("");
        setCategory("");
        setDate("");

        clearSelected();

    };



    const handleSubmit = async () => {

        if (!name || !category) {
            alert("Name and Category must not be empty");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        if (selected) {

            // UPDATE

            await API.put("/expenses/" + selected.id, {

                ...selected,
                name,
                amount,
                category,
                date

            });

        } else {

            // ADD

            await API.post("/expenses", {

                name,
                amount,
                category,
                date,
                userId: state.user.id

            });

        }

        reset();

        reload();
    };



    return (

        <Card>

            <Card.Body>

                <h6>Edit Expense</h6>

                <Form>

                    <Form.Group className="mb-2">

                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                    </Form.Group>


                    <Row>

                        <Col>

                            <Form.Label>Amount</Form.Label>

                            <Form.Control
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />

                        </Col>

                        <Col>

                            <Form.Label>Category</Form.Label>

                            <Form.Select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >

                                <option value="">Select</option>
                                <option>Food</option>
                                <option>Utilities</option>
                                <option>Entertainment</option>
                                <option>Mua sắm</option>

                            </Form.Select>

                        </Col>

                    </Row>

                    <Form.Group className="mt-2">

                        <Form.Label>Date</Form.Label>

                        <Form.Control
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />

                    </Form.Group>

                    <div className="mt-3">

                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={reset}
                        >
                            Reset
                        </Button>


                        <Button
                            onClick={handleSubmit}
                        >
                            {selected ? "Save" : "Add"}
                        </Button>

                    </div>

                </Form>

            </Card.Body>

        </Card>

    );

}