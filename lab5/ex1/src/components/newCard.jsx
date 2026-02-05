import React from 'react';
import { Card } from 'react-bootstrap';

function NewCard({ newItem }) {
  return (
    <Card className="h-100 border-0">

      <Card.Img
        variant="top"
        src={newItem.images}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      <Card.Body className="px-0">

        <Card.Title style={{ fontSize: '15px', fontWeight: '600' }}>
          {newItem.title}
        </Card.Title>

        <Card.Text style={{ fontSize: '13px', color: '#666' }}>
          {newItem.description}
        </Card.Text>

        <a href="/" style={{ fontSize: '12px' }}>
          {newItem.title}
        </a>

      </Card.Body>

    </Card>
  );
}

export default NewCard;
