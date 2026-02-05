import React, { useReducer } from 'react';
import { Container,Form,Button,Row,Col,Modal,Toast,ToastContainer} from 'react-bootstrap';
import { initialContactState } from '../data/contactInitialState';
import { contactReducer } from '../reducers/contactReducer';

function Contact() {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
  const errors = {};

  if (!state.firstName.trim())
    errors.firstName = 'First name is required.';

  if (!state.lastName.trim())
    errors.lastName = 'Last name is required.';

  if (!state.username.trim())
    errors.username = 'Username is required.';
  else if (state.username.length < 4)
    errors.username = 'Username must be at least 4 characters.';

  if (!state.city.trim())
  errors.city = 'City is required.';
else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(state.city))
  errors.city = 'City must contain only letters.';

  if (!state.state.trim())
    errors.state = 'State is required.';

  if (!state.zip.trim())
    errors.zip = 'Zip is required.';
  else if (!/^\d{4,6}$/.test(state.zip))
    errors.zip = 'Zip must be 4–6 digits.';

  if (!state.agree)
    errors.agree = 'You must agree before submitting.';

  dispatch({ type: 'SET_ERRORS', errors });

  return Object.keys(errors).length === 0;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  const handleCloseModal = () => dispatch({ type: 'RESET_FORM' });

  return (
    <Container className="mt-4">

      <Form noValidate onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
              isInvalid={!!state.errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              isInvalid={!!state.errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={state.username}
              onChange={handleChange}
              isInvalid={!!state.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={state.city}
              onChange={handleChange}
              isInvalid={!!state.errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              value={state.state}
              onChange={handleChange}
              isInvalid={!!state.errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zip"
              value={state.zip}
              onChange={handleChange}
              isInvalid={!!state.errors.zip}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            name="agree"
            checked={state.agree}
            onChange={handleChange}
            label="Agree to terms and conditions"
            isInvalid={!!state.errors.agree}
            feedback={state.errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit form</Button>

      </Form>

      <Modal show={state.showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Form submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={state.showToast} autohide delay={3000}>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>Submit thành công!</Toast.Body>
        </Toast>
      </ToastContainer>

    </Container>
  );
}

export default Contact;
