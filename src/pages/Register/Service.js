import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Table, InputGroup, Card, Button } from "react-bootstrap";
import { FaSearch, FaPlus, FaSave, FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import CurrencyInput from "../../components/CurrencyInput";
import { useAuth } from "../../context/AuthContext";
import SearchHelp from "../../components/SearchHelp";
import Opervex from "../../utils/Opervex";

const rolePageRequire = "SERVICES";

var dataDefault = {
  code: "",
  description: "",
  text: "",
  externalCode: "",
  serviceType: null,
  disabled: false,
  prices: [],
};

const actionsDefault = {
  create: true,
  change: true,
  delete: true,
  save: true,
};

const servicesType = [
  {
    key: 1,
    description: "Instalação",
  },
  {
    key: 2,
    description: "Manutenção",
  },
  {
    key: 3,
    description: "Extra",
  },
  {
    key: 4,
    description: "Outros",
  },
  {
    key: 5,
    description: "Lançamento",
  },
  {
    key: 6,
    description: "Fusão",
  },
];

const Service = () => {
  const { roles, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const [actions, setActions] = useState(actionsDefault);
  const [data, setData] = useState(dataDefault);
  const [branches, setBranches] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      commandAction({ ...actionsDefault, create: false });

      const fetchedBranches = await Opervex.Accounting.Branches.findAll();
      setBranches(fetchedBranches);

      const updatedPrices = fetchedBranches.map((branch) => ({
        branch: branch.code,
        description: branch.description,
        points: 0,
        price: 0,
        priceResale: 0,
      }));

      dataDefault.prices = updatedPrices; // Se `dataDefault` for um estado, usar `setDataDefault({...dataDefault, prices: updatedPrices})`

      if (id) {
        await searchAPI(id);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const commandAction = (actions) => {
    const hasPermission = roles.find((role) => role.command === rolePageRequire);

    if (!hasPermission) {
      setActions(actionsDefault);
      return;
    }

    if (!actions.create) actions.create = !hasPermission.actions.some((action) => action.key === "Create");
    if (!actions.change) actions.change = !hasPermission.actions.some((action) => action.key === "Change");

    setActions({ ...actions });
  };

  // Função chamada ao selecionar um item no modal
  const handleSelectItem = async (item) => {
    if (item && item.code) await searchAPI(item.code);

    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    var newData = { ...data };

    switch (name) {
      case "serviceType":
        newData.serviceType = Number(value);
        break;
      default:
        newData = { ...newData, [name]: type === "checkbox" ? checked : value };
        break;
    }

    setData(newData);
  };

  // CRUD Handlers
  const handleButtonCreate = () => {
    setData(dataDefault);
    commandAction({ ...actionsDefault, save: false });
    setDisabledField(false);
  };

  const handleButtonCancel = () => {
    if (data.code === "") {
      setData(dataDefault);
      setDisabledField(true);
      commandAction({ ...actionsDefault, create: false });
    } else {
      searchAPI(data.code);
    }
  };

  const handleButtonSave = async () => {
    const body = { ...data };

    if (data.code) {
      const result = await Opervex.ServiceManagement.Services.update(body.code, body);
      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(data.code);

      alert("Serviço atualizado com sucesso!");
    } else {
      const result = await Opervex.ServiceManagement.Services.create(body);
      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(result.id);

      alert("Serviço criado com sucesso!");
    }
  };

  const handleButtonSearch = async () => {
    setShowModal(true);
  };

  const handleButtonChange = async () => {
    setDisabledField(false);
    commandAction({ ...actionsDefault, save: false });
  };

  const searchAPI = async (id) => {
    setDisabledField(true);

    if (!id) return;

    var result = await Opervex.ServiceManagement.Services.findId(id);

    if (result && !result.error) {
      result.prices.forEach((price) => {
        price.description = branches.find((x) => x.code === price.branch)?.description;
      });

      branches.forEach((branch) => {
        if (!result.prices.find((x) => x.branch === branch.code))
          result.prices.push({
            branch: branch.code,
            description: branch.description,
            points: 0,
            price: 0,
            priceResale: 0,
          });
      });

      setData(result);
      commandAction({ ...actionsDefault, create: false, change: false });
    } else {
      setData(dataDefault);
      commandAction({ ...actionsDefault, create: false });
      alert(result.error);
    }
  };

  const handleChangePrices = (index, e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      prices: prev.prices.map((row, i) => (i === index ? { ...row, [name]: value } : row)),
    }));
  };

  return (
    <>
      <Container className="mt-2">
        <Form>
          {/* ----- Header / Additional -----*/}
          <Card className="mb-2">
            <Card.Header>
              <Row className="d-flex justify-content-between">
                <Col md={8}>
                  <h5>Cabeçalho</h5>
                </Col>
                <Col md={4} className="text-end">
                  <Button variant="success" size="sm" className="me-2" onClick={handleButtonCreate} hidden={actions.create}>
                    <FaPlus /> Novo
                  </Button>
                  <Button variant="primary" size="sm" className="me-2" onClick={handleButtonChange} hidden={actions.change}>
                    <FaPencilAlt /> Alterar
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={handleButtonCancel} hidden={actions.save}>
                    <MdOutlineCancel /> Cancelar
                  </Button>
                  <Button variant="primary" size="sm" className="me-2" onClick={handleButtonSave} hidden={actions.save}>
                    <FaSave /> Salvar
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" size="sm" value={data.code} name="code" onChange={handleChange} disabled={true} />

                      <InputGroup.Text size="sm" type="button" onClick={handleButtonSearch}>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="disabled"
                    checked={data.disabled}
                    name="disabled"
                    onChange={handleChange}
                    label="Inativo"
                    disabled={disabledField}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* ----- Additional -----*/}
          <Card className="mb-2">
            <Card.Header>
              <h5>Informações Adicionais</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Label>Texto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    size="sm"
                    value={data.text}
                    disabled={disabledField}
                    onChange={handleChange}
                    name="text"
                  />
                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Código Externo</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={data?.externalCode}
                      onChange={handleChange}
                      name="externalCode"
                      disabled={disabledField}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select
                      size="sm"
                      value={data.serviceType}
                      onChange={handleChange}
                      name="serviceType"
                      disabled={disabledField}
                    >
                      <option value="">Selecione...</option>
                      {servicesType.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.description}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ----- Prices -----*/}
          <Card className="mb-2">
            <Card.Header>
              <h5>Preço do Serviço por Unidade</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr className="text-center align-middle">
                      <th>Unidade</th>
                      <th>Descrição</th>
                      <th>Pontos</th>
                      <th>Preço</th>
                      <th>Preço Revenda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.prices.length > 0 ? (
                      data.prices.map((price, index) => (
                        <tr key={index}>
                          <td>{price.branch}</td>
                          <td>{branches.find((x) => x.code === price.branch).description}</td>
                          <td>
                            {!disabledField ? (
                              <Form.Control
                                type="number"
                                size="sm"
                                value={price.points ? Number(price.points) : 0}
                                onChange={(e) =>
                                  handleChangePrices(index, {
                                    target: { name: "points", value: parseInt(e.target.value, 10) || 0 },
                                  })
                                }
                                disabled={disabledField}
                              />
                            ) : (
                              <>{price.points ? Number(price.points) : 0}</>
                            )}
                          </td>
                          <td>
                            <CurrencyInput
                              value={price.price}
                              onChange={(e) => handleChangePrices(index, { target: { name: "price", value: e } })}
                              disabled={disabledField}
                            />
                          </td>
                          <td>
                            <CurrencyInput
                              value={price.priceResale}
                              onChange={(e) => handleChangePrices(index, { target: { name: "priceResale", value: e } })}
                              disabled={disabledField}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Nenhum preço encontrada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>

      <SearchHelp
        showModal={showModal}
        setShowModal={setShowModal}
        onSelectItem={handleSelectItem}
        urlData="/ServiceManagement/Service/SearchHelp"
        urlSchema="/ServiceManagement/Service/SearchHelp/Schema"
      />
    </>
  );
};

export default Service;
