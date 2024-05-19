import { Row, Col, Container } from "react-bootstrap";

type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
