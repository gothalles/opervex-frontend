// src/pages/Register/Product.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  InputGroup,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import {
  FaSearch,
  FaUpload,
  FaPlus,
  FaSave,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";
import SearchHelp from "../../components/SearchHelp";
import Opervex from "../../Opervex";

const rolePageRequire = "PRODUCTS";

const dataDefault = {
  code: "",
  description: "",
  category: null,
  subcategory: null,
  unitMeasurement: "",
  manufacturer: "",
  model: "",
  externalCode: "",
  controlSerial: false,
  controlMac: false,
  disabled: false,
  existGm: false,
  unitsMeasure: [],
  image: {
    type: "",
    name: "",
    length: 0,
    base64: "",
  },
};

const actionsDefault = {
  create: true,
  change: true,
  delete: true,
  save: true,
};

const Product = () => {
  const { roles, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const [actions, setActions] = useState(actionsDefault);
  const [data, setData] = useState(dataDefault);
  const [unitsMeasure, setUnitsMeasure] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      commandAction({ ...actionsDefault, create: false });

      setUnitsMeasure(await Opervex.System.UnitsMeasure.findAll());
      setCategories(await Opervex.MaterialMaster.Categories.findAll());

      if (id) await searchAPI(id);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

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

  // Função chamada ao selecionar um item no modal
  const handleSelectItem = async (item) => {
    if (item && item.code) await searchAPI(item.code);

    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    var newData = { ...data };

    switch (name) {
      case "category":
        newData.category = Number(value);
        newData.subcategory = null;
        break;
      case "subcategory":
        newData.subcategory = Number(value);
        break;
      case "unitMeasurement":
        newData.unitMeasurement = value;

        const baseIndex = newData.unitsMeasure.findIndex(
          (x) => x.base === true
        );
        if (baseIndex !== -1) newData.unitsMeasure.splice(baseIndex, 1);

        const unitIndex = newData.unitsMeasure.findIndex(
          (x) => x.unit === value
        );
        if (unitIndex !== -1) newData.unitsMeasure.splice(unitIndex, 1);

        newData.unitsMeasure.push({
          unit: value,
          description: unitsMeasure.find((x) => x.code === value).description,
          denominator: 1,
          counter: 1,
          base: true,
        });

        break;
      default:
        newData = { ...newData, [name]: type === "checkbox" ? checked : value };
        break;
    }

    setData(newData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.replace(
          /^data:image\/[a-zA-Z0-9+-]+;base64,/,
          ""
        ); // Remove qualquer prefixo de imagem Base64

        setData((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            base64: base64String,
            type: file.type,
            length: file.size,
            name: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD Handlers
  const handleButtonCreate = () => {
    data.unitMeasurement = null;

    setData(dataDefault);
    commandAction({ ...actionsDefault, save: false });
    setDisabledField(false);
  };

  const handleButtonCancel = () => {
    if (data.code === "") {
      data.unitMeasurement = null;

      setData(dataDefault);
      setDisabledField(true);
      commandAction({ ...actionsDefault, create: false });
    } else {
      searchAPI(data.code);
    }
  };

  const handleButtonSave = async () => {
    const body = { ...data };

    if (!body.image.base64) delete body.image;

    if (data.code) {
      const result = await Opervex.MaterialMaster.Products.update(
        body.code,
        body
      );
      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(data.code);

      alert("Produto atualizado com sucesso!");
    } else {
      const result = await Opervex.MaterialMaster.Products.create(body);
      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(result.id);

      alert("Produto criado com sucesso!");
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

    var result = await Opervex.MaterialMaster.Products.findId(id);

    if (result) {
      result.unitsMeasure.map((unitMeasure) => {
        unitMeasure.description = unitsMeasure.find(
          (x) => x.code === unitMeasure.unit
        )?.description;
      });

      setData(result);

      commandAction({ ...actionsDefault, create: false, change: false });
    } else {
      setData(dataDefault);
      commandAction({ ...actionsDefault, create: false });
      alert("Produto não encontrado!");
    }
  };

  const handleChangeUnitsMeasure = (index, e) => {
    const { name, value } = e.target;

    if (name === "unit") {
      if (data.unitsMeasure.find((x) => x.unit === value.toUpperCase())) {
        alert(
          "Undade de conversão '" + value.toUpperCase() + "' já cadastrada"
        );

        return;
      }
      setData((prev) => ({
        ...prev,
        unitsMeasure: prev.unitsMeasure.map((row, i) =>
          i === index
            ? {
                ...row,
                description: unitsMeasure.find(
                  (x) => x.code === value.toUpperCase()
                )?.description,
              }
            : row
        ),
      }));
    }

    setData((prev) => ({
      ...prev,
      unitsMeasure: prev.unitsMeasure.map((row, i) =>
        i === index ? { ...row, [name]: value.toUpperCase() } : row
      ),
    }));
  };

  const handleRemoveUnitsMeasure = (index) => {
    setData((prev) => ({
      ...prev,
      unitsMeasure: prev.unitsMeasure.filter((_, i) => i !== index),
    }));
  };

  const addRow = () => {
    setData((prev) => ({
      ...prev,
      unitsMeasure: [
        ...prev.unitsMeasure,
        { unit: "", description: "", denominator: 1, counter: 1, base: false },
      ],
    }));
  };

  return (
    <>
      <Container className="mt-2">
        <Form>
          {/* ----- Header -----*/}
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
                  {<br />}
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="existGm"
                    name="existGm"
                    onChange={handleChange}
                    checked={data.existGm}
                    label="Movimentação"
                    disabled={true}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ----- Determination -----*/}
          <Card className="mb-2">
            <Card.Header>
              <h5>Determinação</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Col md={6}>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Unidade de Medida Básica</Form.Label>
                        <Form.Select
                          size="sm"
                          value={data.unitMeasurement}
                          onChange={handleChange}
                          name="unitMeasurement"
                          disabled={disabledField || data.existGm}
                        >
                          <option value="">Selecione...</option>
                          {unitsMeasure.map((unitMeasure) => (
                            <option
                              key={unitMeasure.code}
                              value={unitMeasure.code}
                            >
                              {unitMeasure.description}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select
                          size="sm"
                          value={data.category}
                          onChange={handleChange}
                          name="category"
                          disabled={disabledField}
                        >
                          <option value={null}>Selecione...</option>
                          {categories.map((category) => (
                            <option key={category.code} value={category.code}>
                              {category.description}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Sub Categoria</Form.Label>
                        <Form.Select
                          size="sm"
                          value={data.subcategory}
                          onChange={handleChange}
                          name="subcategory"
                          disabled={
                            !categories.find(
                              (x) => x.code === Number(data.category)
                            )?.subcategories.length || disabledField
                          }
                        >
                          <option value={null}>Selecione...</option>
                          {categories
                            ?.filter((x) => x.code === Number(data.category))
                            .map((category) =>
                              category.subcategories.map((subcategory) => (
                                <option
                                  key={subcategory.code}
                                  value={subcategory.code}
                                >
                                  {subcategory.description}
                                </option>
                              ))
                            )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="controlSerial"
                        name="controlSerial"
                        checked={data?.controlSerial}
                        onChange={handleChange}
                        label="Controle Nº Série"
                        disabled={disabledField}
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        name="controlMac"
                        id="controlMac"
                        checked={data?.controlMac}
                        onChange={handleChange}
                        label="Controle MAC"
                        disabled={disabledField}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row className="mb-2">
                    <Col md={4}></Col>
                    <Col md={4}>
                      <Form.Group className="d-flex justify-content-center">
                        <span class="border">
                          <Image
                            width={200}
                            height={200}
                            src={
                              data.image.type
                                ? `data:${data.image.type};base64,${data.image.base64}`
                                : ""
                            }
                            name="image"
                            onChange={handleChange}
                            rounded
                          />
                        </span>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="d-flex justify-content-start">
                        <div className="mb-2">
                          <Button
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                            disabled={disabledField}
                          >
                            <FaUpload /> Carregar Imagem
                          </Button>
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
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
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fabricante</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={data?.manufacturer}
                      onChange={handleChange}
                      name="manufacturer"
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={data?.model}
                      onChange={handleChange}
                      name="model"
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>
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
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ----- Conversion -----*/}
          <Card className="mb-2">
            <Card.Header>
              <h5>Conversão de Unidade de Medida</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-2">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr className="text-center align-middle">
                      <th>Unidade Base</th>
                      <th>Unidade</th>
                      <th>Descrição</th>
                      <th>Denominador</th>
                      <th>Contador</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.unitsMeasure.length > 0 ? (
                      data.unitsMeasure.map((unitMeasure, index) => (
                        <tr key={index}>
                          <td className="text-center align-middle">
                            <Form.Check
                              type="checkbox"
                              checked={unitMeasure.base}
                              readOnly
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              size="sm"
                              name="unit"
                              value={unitMeasure.unit}
                              onChange={(e) =>
                                handleChangeUnitsMeasure(index, e)
                              }
                              disabled={disabledField || unitMeasure.base}
                            />
                          </td>
                          <td>{unitMeasure.description}</td>
                          <td>
                            <Form.Control
                              size="sm"
                              type="number"
                              name="denominator"
                              value={unitMeasure.denominator}
                              onChange={(e) =>
                                handleChangeUnitsMeasure(index, e)
                              }
                              disabled={disabledField || unitMeasure.base}
                            />
                          </td>
                          <td>
                            <Form.Control
                              size="sm"
                              type="number"
                              name="counter"
                              value={unitMeasure.counter}
                              onChange={(e) =>
                                handleChangeUnitsMeasure(index, e)
                              }
                              disabled={disabledField || unitMeasure.base}
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveUnitsMeasure(index)}
                              size="sm"
                              disabled={disabledField || unitMeasure.base}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Nenhuma unidade de conversão encontrada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <Button
                  variant="primary"
                  onClick={addRow}
                  hidden={actions.save}
                >
                  Adicionar Linha
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>

      <SearchHelp
        showModal={showModal}
        setShowModal={setShowModal}
        onSelectItem={handleSelectItem}
        urlData="/MaterialMaster/Product/SearchHelp"
        urlSchema="/MaterialMaster/Product/SearchHelp/Schema"
      />
    </>
  );
};

export default Product;
