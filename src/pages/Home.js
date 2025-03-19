import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <h1 class=" text-center">Bem-vindo ao Opervex!</h1>
        </Row>

        <br />

        <Row>
          <h5 class="fw-light text-center">
            Gerencie seus produtos, serviços, lançamentos e relatórios de forma
            fácil e eficiente.
          </h5>
        </Row>
      </Container>
    </>
  );
};

export default Home;
