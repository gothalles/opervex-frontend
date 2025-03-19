// src/pages/Register/ServiceOrder.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Form, Table, InputGroup, Card } from "react-bootstrap";
import { FaSearch, FaCloudDownloadAlt } from "react-icons/fa";
import Opervex from "../../utils/Opervex";

const ServiceOrder = () => {
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setBranches(await Opervex.Accounting.Branches.findAll());
      setCities(await Opervex.Accounting.Cities.findAll());

      if (id) await getData();
    };

    fetchData();
  }, []);

  const getData = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ServiceManagement/ServiceOrder/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao carregar os dados:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="mt-2">
        <Form>
          {/* Informações da O.S. */}
          <Card className="mb-2">
            <Card.Header>
              <h5>Informações da O.S.</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Protocolo</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" size="sm" value={data?.header?.protocol} />

                      <InputGroup.Text size="sm" type="button">
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>ID Tarefa</Form.Label>
                    <Form.Control type="text" size="sm" value={data?.header?.idTask} />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Data Execução</Form.Label>
                    <Form.Control type="date" size="sm" value={data?.header?.documentDate} />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group>
                    <Form.Label>Início</Form.Label>
                    <Form.Control type="time" size="sm" value={data?.header?.startTime} />
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Form.Group>
                    <Form.Label>Fim</Form.Label>
                    <Form.Control type="time" size="sm" value={data?.header?.endTime} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Unidade:</Form.Label>
                    <Form.Select size="sm" value={data?.header?.branch}>
                      <option>Selecione...</option>
                      {branches.map((branch) => (
                        <option key={branch.code} value={branch.code}>
                          {branch.description}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={2} className="d-flex align-items-end">
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    label="Invalidar Pontuação"
                    id="unproductive"
                    value={data?.header?.unproductive}
                  />
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Motivo</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Link:</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" size="sm" value={data?.header?.link} />
                      <InputGroup.Text size="sm" type="button">
                        <FaCloudDownloadAlt />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Dados do Cliente */}
          <Row className="mb-2">
            <Col md={6}>
              <Card className="mb-2">
                <Card.Header>
                  <h5>Dados do Cliente</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Código</Form.Label>
                        <Form.Control type="number" size="sm" value={data?.header?.customerCode} />
                      </Form.Group>
                    </Col>
                    <Col md={9}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" size="sm" value={data?.header?.customerName} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Select size="sm" value={data?.header?.city}>
                          <option>Selecione...</option>
                          {cities.map((city) => (
                            <option key={city.code} value={city.code}>
                              {city.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-2">
                <Card.Header>
                  <h5>Equipe</h5>
                </Card.Header>
                <Card.Body>
                  {/* Técnico */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label>Técnico</Form.Label>
                      <InputGroup>
                        <Form.Control type="text" size="sm" value={data?.header?.technician} />

                        <InputGroup.Text size="sm" type="button">
                          <FaSearch />
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                    <Col md={9}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" size="sm" value={data?.header?.technicianName} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Supervisor */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Supervisor</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" size="sm" value={data?.header?.supervisor} />

                          <InputGroup.Text size="sm" type="button">
                            <FaSearch />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={9}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" size="sm" value={data?.header?.supervisorName} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Auxiliar */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label>Auxiliar</Form.Label>
                      <Form.Group>
                        <InputGroup>
                          <Form.Control type="text" size="sm" value={data?.header?.assistant} />

                          <InputGroup.Text size="sm" type="button">
                            <FaSearch />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={9}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" size="sm" value={data?.header?.assistantName} />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>

        {/* Serviços Executados */}
        <Card className="mb-2">
          <Card.Header>
            <h5>Serviços Executados</h5>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Preço Revenda</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>
                {data?.services?.length > 0 ? (
                  data.services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.item}</td>
                      <td>{service.codeItem}</td>
                      <td>{service.description}</td>
                      <td>{service.quantity}</td>
                      <td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(service.price)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(service.priceResale)}
                      </td>
                      <td>{service.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Nenhum serviço encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Produtos */}
        <Card className="mb-2">
          <Card.Header>
            <h5>Produtos</h5>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Unidade</th>
                  <th>Nº Série</th>
                  <th>MAC</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.length > 0 ? (
                  data.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.item}</td>
                      <td>{product.codeItem}</td>
                      <td>{product.description}</td>
                      <td>{product.quantity}</td>
                      <td>{product.unitMeasurement}</td>
                      <td>{product.serialNumber}</td>
                      <td>{product.mac}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Nenhum serviço encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ServiceOrder;
