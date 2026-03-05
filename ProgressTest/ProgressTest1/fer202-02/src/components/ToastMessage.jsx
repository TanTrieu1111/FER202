import { Toast, ToastContainer } from "react-bootstrap";

function ToastMessage({ show, message, onClose, bg }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} bg={bg} delay={2000} autohide onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;