import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, onCancel, onConfirm }) {

    return (

        <Modal show={show} onHide={onCancel} centered>

            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Do you really want to delete this expense?
            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirm}
                >
                    Delete
                </Button>

            </Modal.Footer>

        </Modal>

    );

}