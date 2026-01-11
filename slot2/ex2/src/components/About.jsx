import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
function About() {
    const student = {
        id: 1,
        name: "Tan Trieu",
        avatar: "/images/42405ed0f0a4774d6bd6dc782940571f.jpg",
        age: 21,
        grade: "SE19C02"

    }
    return (
        <>
        <Card style={{ width: '18rem' }}>
            <img src={student.avatar} alt={student.name} 
            style={{marginLeft: '90px',borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover'}} />
            
        <Card.Body>
                <Card.Title>Student card</Card.Title>
                <Card.Text>
                    <p>ID: {student.id}</p>
                    <p>Name: {student.name}</p>
                    <p>Age: {student.age}</p>
                    <p>Grade: {student.grade}</p>
                </Card.Text>
                <Button variant="primary">Pick me</Button>
            </Card.Body>
        </Card>
        </>
    );
}export default About;