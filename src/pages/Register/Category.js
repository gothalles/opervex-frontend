// src/pages/Register/Category.js

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
} from "react-bootstrap";
import { FaSearch, FaPlus, FaSave, FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";
import SearchHelp from "../../components/SearchHelp";
import Opervex from "../../Opervex";

const rolePageRequire = "CATEGORIES";

var dataDefault = {
  code: "",
  description: "",
  subcategory: false,
  categoryTop: null,
  disabled: false,
};

const actionsDefault = {
  create: true,
  change: true,
  delete: true,
  save: true,
};

const Category = () => {
  const { roles, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const [actions, setActions] = useState(actionsDefault);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(dataDefault);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      commandAction({ ...actionsDefault, create: false });

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
      case "categoryTop":
        newData.categoryTop = Number(value);
        break;
      case "subcategory":
        newData.subcategory = checked;

        if (!newData.subcategory) newData.categoryTop = null;
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
    var body = { ...data };

    if (data.code) {
      const result = await Opervex.MaterialMaster.Categories.update(
        body.code,
        body
      );

      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(data.code);

      alert("Registro atualizado com sucesso!");
    } else {
      const result = await Opervex.MaterialMaster.Categories.create(body);
      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(result.id);

      alert("Registro criado com sucesso!");
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

    var result = await Opervex.MaterialMaster.Categories.findId(id);
    console.log(result);
    if (result && !result.error) {
      setData(result);
      commandAction({ ...actionsDefault, create: false, change: false });
    } else {
      setData(dataDefault);
      commandAction({ ...actionsDefault, create: false });
      alert(result.error);
    }
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
                      maxLength={30}
                      value={data.description}
                      onChange={handleChange}
                      disabled={disabledField}
                    />
                  </Form.Group>
                </Col>

                <Col md={2} className="d-flex align-items-center">
                  <Form.Check
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
                <Col md={2} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="subcategory"
                    checked={data.subcategory}
                    name="subcategory"
                    onChange={handleChange}
                    label="Subcategoria"
                    disabled={disabledField}
                  />
                  <Col md={10}></Col>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                      size="sm"
                      value={data.categoryTop ? data.categoryTop : 0}
                      onChange={handleChange}
                      name="categoryTop"
                      disabled={disabledField || !data.subcategory}
                    >
                      <option value={0}>Selecione...</option>
                      {categories
                        .filter((x) => x.code !== data.code)
                        .map((category) => (
                          <option key={category.code} value={category.code}>
                            {category.description}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}></Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Container>

      <SearchHelp
        showModal={showModal}
        setShowModal={setShowModal}
        onSelectItem={handleSelectItem}
        urlData="/MaterialMaster/Categories/SearchHelp"
        urlSchema="/MaterialMaster/Categories/SearchHelp/Schema"
      />
    </>
  );
};

export default Category;
