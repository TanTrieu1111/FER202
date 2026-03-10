import { Table, Button } from "react-bootstrap";
import API from "../services/api";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import ToastMessage from "./ToastMessage";
export default function ExpenseTable({ expenses, reload, onEdit }) {

    const del = async (id) => {

        await API.delete("/expenses/" + id);

        setShowConfirm(false);
        reload();
        setShowToast(true);
    };
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const formatDate = (d) => {

        const date = new Date(d);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <Table bordered>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>

                    </tr>
                </thead>

                <tbody>
                    {expenses.map(e => (
                        <tr key={e.id}>
                            <td>{e.name}</td>
                            <td>
                                {Number(e.amount).toLocaleString()} ₫
                            </td>
                            <td>{e.category}</td>
                            <td>{formatDate(e.date)}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => onEdit(e)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => {
                                        setDeleteId(e.id);
                                        setShowConfirm(true);
                                    }}
                                >
                                    Delete
                                </Button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </Table>


            {/* Confirm delete popup */}
            <ConfirmModal
                show={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={del}
            />

            {/* Delete success message */}
            <ToastMessage
                show={showToast}
                message="Delete successfully"
                onClose={() => setShowToast(false)}
            />
        </>
    );

}