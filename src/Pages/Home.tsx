import React from 'react';
import { Container, Row, Col,  Button } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container fluid className="p-3">
      <Row className="justify-content-md-center">
        <Col md="auto">
          
            <h1 className="display-4 text-center">Welcome to Our Website!</h1>
            <p className="lead text-center">
              We are delighted to have you here. Explore and enjoy the content we have to offer.
            </p>
            <hr className="my-4" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis alias error ratione quas soluta esse eveniet facere inventore voluptates mollitia unde quod iste, expedita similique adipisci nam velit. Voluptate, ipsa.
            </p>
            <Button variant="primary" href="#learn-more">
              Learn More
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
