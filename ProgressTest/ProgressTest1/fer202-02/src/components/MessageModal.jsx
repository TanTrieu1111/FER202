import { Modal, Button } from "react-bootstrap";

function MessageModal({ show, message, onClose }) {
  return (
    <Modal show={show} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Login Successful</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {message}
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={onClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;