import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastMessage({ show, message, onClose }) {

    return (

        <ToastContainer
            position="top-end"
            className="p-3"
        >

            <Toast
                bg="success"
                show={show}
                delay={2000}
                autohide
                onClose={onClose}
            >

                <Toast.Body className="text-white">
                    {message}
                </Toast.Body>

            </Toast>

        </ToastContainer>

    );

}