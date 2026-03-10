import { useState, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function ExpenseForm({ reload }) {

    const { state } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const addExpense = async (e) => {

        e.preventDefault();

        if (!name || !category) {
            setError("Name and Category cannot be empty");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError("Amount must be greater than 0");
            return;
        }

        await API.post("/expenses", {
            name,
            amount,
            category,
            date,
            userId: state.user.id
        });

        setName("");
        setAmount("");
        setCategory("");
        setDate("");

        reload();
    };

    return (

        <Card className="mt-4">

            <Card.Body>

                <h5>Add Expense</h5>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={addExpense}>

                    <Form.Control
                        className="mb-2"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />

                    <Form.Control
                        className="mb-2"
                        placeholder="Category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />

                    <Form.Control
                        className="mb-2"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    <Button type="submit">
                        Add Expense
                    </Button>

                </Form>

            </Card.Body>

        </Card>

    );

}