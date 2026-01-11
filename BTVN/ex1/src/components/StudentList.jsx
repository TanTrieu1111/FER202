import listOfStudent from "../listOfStudent.js";
import About from "./About";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function StudentList() {
  return (
    <Container className="mt-4">
      <Row>
        {listOfStudent.map((student) => (
          <Col
            key={student.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <About student={student} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StudentList;
