import { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/trips')
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary mb-4">Your Trips</h1>
      <Row>
        {trips.map((trip) => (
          <Col md={4} key={trip.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{trip.destination}</Card.Title>
                <Card.Text>{trip.date}</Card.Text>
                <Button variant="success">View Trip</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
