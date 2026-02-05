import React from 'react';
import { newLists } from '../data/newList';
import NewCard from '../components/newCard';
import { Container, Row, Col } from 'react-bootstrap';

function NewPage() {
  return (
    <Container className="mt-3">

      <h3 style={{ color: 'red', marginBottom: '20px' }}>
        News Category
      </h3>

      <Row>
        {newLists.map((item) => (
          <Col key={item.id} lg={3} md={6} sm={12} className="mb-4">
            <NewCard newItem={item} />
          </Col>
        ))}
      </Row>

    </Container>
  );
}

export default NewPage;
