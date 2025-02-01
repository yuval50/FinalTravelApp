import { useState, useEffect } from 'react';
import { login, register } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import '../styles/Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register({ email, username, password });
        alert('Account created! Please log in.');
        setIsRegister(false);
      } else {
        const res = await login({ email, password });

        // ✅ Store token in localStorage
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        navigate('/dashboard');
      }
    } catch (error) {
      alert('Error: ' + (error.data|| 'Something went wrong'));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="auth-card">
        <Card.Body>
          <h2 className="text-center">{isRegister ? 'Sign Up' : 'Log In'}</h2>
          <Form onSubmit={handleSubmit}>
            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isRegister ? 'Sign Up' : 'Log In'}
            </Button>
          </Form>

          <Row className="mt-3">
            <Col className="text-center">
              {isRegister ? (
                <p>
                  Already have an account?{' '}
                  <span className="auth-toggle" onClick={() => setIsRegister(false)}>
                    Log in
                  </span>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <span className="auth-toggle" onClick={() => setIsRegister(true)}>
                    Sign up
                  </span>
                </p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Auth;
