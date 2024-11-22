import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 bg-black">
      <Container>
        <Row>
          <Col md="4">
            <h5>About Us</h5>
            <p>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis laborum adipisci quod iure saepe temporibus earum ratione ipsa architecto aut, harum labore dolorum explicabo culpa sed vel vitae repellat dignissimos?
            </p>
          </Col>
          <Col md="4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home">Home</a></li>
              <li><a href="#product">About</a></li>
              <li><a href="#category">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          <Col md="4">
            <h5>Contact Us</h5>
            <p>
              Email: musicmojica@gmail.com <br />
              Phone: +123 456 7890
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2024 Galaxy Store.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
