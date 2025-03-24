import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaSave, FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import CurrencyInput from "../../components/CurrencyInput";
import { useAuth } from "../../context/AuthContext";
import SearchHelp from "../../components/SearchHelp";
import Opervex from "../../utils/Opervex";
import CustomAlert from "../../components/CustomAlert";

const rolePageRequire = "SALES_ORDER";

const dataDefault = {
  code: "",
  description: "",
  documentDate: null,
  customerName: "",
  protocol: "",
  service: 0,
  planPrice: 0,
  newPrice: 0,
  seller: 0,
  mobileLines: 0,
  operator: 0,
};

const actionsDefault = {
  create: true,
  change: true,
  delete: true,
  save: true,
};

const SalesOrder = () => {
  const { roles, loading } = useAuth();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState(dataDefault);
  const [disabledField, setDisabledField] = useState(true);
  const [actions, setActions] = useState(actionsDefault);
  const [sellers, setSellers] = useState([]);
  const [services, setServices] = useState([]);
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      commandAction({ ...actionsDefault, create: false });

      setSellers(await Opervex.HumanResources.Employees.findAllSeller());
      setOperators(await Opervex.System.TelephoneOperator.findAll());
      setServices(await Opervex.ServiceManagement.Service.getSales());

      if (id) {
        await searchAPI(id);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    var newData = { ...data };

    switch (name) {
      case "service":
        newData.service = Number(value);
        break;
      case "seller":
        newData.seller = Number(value);
        break;
      case "operator":
        newData.operator = Number(value);
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
      const result = await Opervex.Sales.SalesOrder.update(body.code, body);

      if (result.error) {
        setErrors(result.errors);
        return;
      }

      await searchAPI(data.code);

      alert("Venda atualizada com sucesso!");
    } else {
      const result = await Opervex.Sales.SalesOrder.create(body);
      if (result.errors) {
        setErrors(result.errors);
        return;
      }

      await searchAPI(result.id);
      setData(dataDefault);
      alert("Venda criada com sucesso!");
    }

    setErrors(null);
  };

  const handleButtonSearch = async () => {
    setShowModal(true);
  };

  const handleButtonChange = async () => {
    setDisabledField(false);
    commandAction({ ...actionsDefault, save: false });
  };

  const commandAction = (actions) => {
    const hasPermission = roles.find(
      (role) => role.command === rolePageRequire
    );

    if (!hasPermission) {
      setActions(actionsDefault);
      return;
    }

    if (!actions.create)
      actions.create = !hasPermission.actions.some(
        (action) => action.key === "Create"
      );
    if (!actions.change)
      actions.change = !hasPermission.actions.some(
        (action) => action.key === "Change"
      );

    setActions({ ...actions });
  };

  const searchAPI = async (id) => {
    setDisabledField(true);

    if (!id) return;

    var result = await Opervex.Sales.SalesOrder.findId(id);

    if (result && !result.error) {
      setData(result);
      commandAction({ ...actionsDefault, create: false, change: false });
    } else {
      setData(dataDefault);
      commandAction({ ...actionsDefault, create: false });
      alert(result.error);
    }
  };

  // Função chamada ao selecionar um item no modal
  const handleSelectItem = async (item) => {
    if (item && item.code) await searchAPI(item.code);

    setShowModal(false);
  };

  return (
    <>
      <Container className="mt-2">
        <CustomAlert errors={errors} setErrors={setErrors} />
        <Form>
          {/* ----- Header / Additional -----*/}
          <Card className="mb-2">
            <Card.Header>
              <Row className="d-flex justify-content-between">
                <Col md={8}>
                  <h5>Cabeçalho</h5>
                </Col>
                <Col md={4} className="text-end">
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={handleButtonCreate}
                    hidden={actions.create}
                  >
                    <FaPlus /> Novo
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={handleButtonChange}
                    hidden={actions.change}
                  >
                    <FaPencilAlt /> Alterar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={handleButtonCancel}
                    hidden={actions.save}
                  >
                    <MdOutlineCancel /> Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={handleButtonSave}
                    hidden={actions.save}
                  >
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
                      <Form.Control
                        type="text"
                        size="sm"
                        value={data.code}
                        name="code"
                        onChange={handleChange}
                        disabled={true}
                      />

                      <InputGroup.Text
                        size="sm"
                        type="button"
                        onClick={handleButtonSearch}
                      >
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={10}>
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
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Data da Venda</Form.Label>
                    <Form.Control
                      type="date"
                      name="documentDate"
                      size="sm"
                      value={data.documentDate}
                      onChange={handleChange}
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Protocolo</Form.Label>
                    <Form.Control
                      type="text"
                      name="protocol"
                      size="sm"
                      value={data.protocol}
                      onChange={handleChange}
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nome do Cliente</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerName"
                      size="sm"
                      value={data.customerName}
                      onChange={handleChange}
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Select
                      size="sm"
                      value={data.seller}
                      name="seller"
                      onChange={handleChange}
                      disabled={disabledField}
                    >
                      <option value="0">Selecione...</option>
                      {sellers.map((seller) => (
                        <option key={seller.code} value={seller.code}>
                          {seller.firstName + " " + seller.lastName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Serviço</Form.Label>
                    <Form.Select
                      size="sm"
                      value={data.service}
                      name="service"
                      onChange={handleChange}
                      disabled={disabledField}
                    >
                      <option value="0">Selecione...</option>
                      {Array.isArray(services) &&
                        services.map((service) => (
                          <option key={service.code} value={service.code}>
                            {service.description}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}></Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <CurrencyInput
                    label={"Valor do Plano"}
                    value={data.planPrice}
                    onChange={(e) =>
                      handleChange({ target: { name: "planPrice", value: e } })
                    }
                    disabled={disabledField}
                    showDisabled={true}
                  />
                </Col>
                <Col md={6}>
                  <CurrencyInput
                    label={"Valor Novo"}
                    value={data.newPrice}
                    onChange={(e) =>
                      handleChange({ target: { name: "newPrice", value: e } })
                    }
                    disabled={disabledField}
                    showDisabled={true}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Quantidades de Linhas Móveis</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={data.mobileLines ? Number(data.mobileLines) : 0}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "mobileLines",
                            value: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group hidden={Number(data.mobileLines) === 0}>
                    <Form.Label>Operadora</Form.Label>
                    <Form.Select
                      size="sm"
                      value={data.operator}
                      onChange={handleChange}
                      name="operator"
                      disabled={disabledField}
                    >
                      <option value="0">Selecione...</option>
                      {operators.map((operator) => (
                        <option key={operator.code} value={operator.code}>
                          {operator.description}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>
      <SearchHelp
        showModal={showModal}
        setShowModal={setShowModal}
        onSelectItem={handleSelectItem}
        urlData="/Sales/SalesOrder/SearchHelp"
        urlSchema="/Sales/SalesOrder/SearchHelp/Schema"
      />
    </>
  );
};

export default SalesOrder;
