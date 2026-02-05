import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const quizData = [
  {
    question: 'What is ReactJS?',
    options: [
      'A JavaScript library for building user interfaces',
      'A programming language',
      'A database management system'
    ],
    answer: 0
  },
  {
    question: 'What is JSX?',
    options: [
      'A programming language',
      'A file format',
      'A syntax extension for JavaScript'
    ],
    answer: 2
  }
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (selected === quizData[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setCompleted(true);
    }
  };

  return (
    <Container className="mt-4">
      <Row>

        {/* LEFT */}

        <Col md={6}>
          <Card className="p-4 shadow">

            <h4 className="text-danger">Question {current + 1}</h4>
            <p>{quizData[current].question}</p>

            <Form>
              {quizData[current].options.map((item, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={item}
                  checked={selected === index}
                  onChange={() => setSelected(index)}
                  className="mb-2"
                />
              ))}
            </Form>

            <Button
              className="mt-3"
              variant="danger"
              onClick={handleNext}
              disabled={selected === null}
            >
              Next
            </Button>

          </Card>
        </Col>

        {/* RIGHT */}

        <Col md={6}>
          <Card className="p-5 shadow text-center">

            {completed ? (
              <>
                <h1 className="text-danger">Quiz Completed!</h1>
                <h4>Your score: {score}</h4>
              </>
            ) : (
              <>
                <h2 className="text-muted">Answer the questions</h2>
              </>
            )}

          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Quiz;
