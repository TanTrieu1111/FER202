import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
function About({ student }) {
  return (
    <Card style={{ width: '18rem' }} className="h-100">
      <div className="d-flex justify-content-center mt-3">
        <img
          src={student.avatar}
          alt={student.name}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>

      <Card.Body className="text-center">
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          ID: {student.id} <br />
          Name: {student.name} <br />
          Age: {student.age} <br />
          Grade: {student.grade}
        </Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

export default About;
