// src/pages/System/AccessProfile.js

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
import Tree from "@widgetjs/tree";

import { useAuth } from "../../context/AuthContext";
import SearchHelp from "../../components/SearchHelp";
import Opervex from "../../Opervex";

const rolePageRequire = "USER_PROFILE";

const dataDefault = {
  header: {
    code: 0,
    name: "",
  },
  profiles: [],
};

const actionsDefault = {
  create: true,
  change: true,
  delete: true,
  save: true,
};

var myTree = null;

const AccessProfile = () => {
  const { roles, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [disabledField, setDisabledField] = useState(true);
  const [actions, setActions] = useState(actionsDefault);
  const [treeData, setTreeData] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [data, setData] = useState(dataDefault);
  const { id } = useParams();

  const buildNodes = (profileList, parent, nodekey) => {
    return profileList
      .filter((x) => x.parent === parent)
      .map((profile) => {
        // Create the base profile node
        const node = {
          id: `${nodekey}_${profile.code}`,
          text: profile.description,
          attributes: {
            actionTop: { code: 3, key: "Read" },
            parentCode: profile.code,
          },
          children: [],
        };

        // Add action nodes as children
        profile.actions
          .filter((x) => x.key !== "Read")
          .forEach((action) => {
            node.children.push({
              id: `${nodekey}_${profile.code}_${action.key}`,
              text: action.name,
              attributes: {
                action: action,
                parentCode: profile.code,
              },
              leaf: true, // Mark as leaf node (no children)
            });
          });

        // Recursively add child profiles (will appear after actions)
        const childProfiles = buildNodes(
          profileList,
          profile.code,
          `${nodekey}_${profile.code}`
        );

        node.children.push(...childProfiles);

        if (
          !node.children.length &&
          profile.actions.length === 1 &&
          profile.actions[0].key === "Read"
        ) {
          node.attributes = {
            action: profile.actions[0],
            parentCode: profile.code,
          };
        }

        return node;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        commandAction({ ...actionsDefault, create: false });
        const profileList = await Opervex.System.Profile.findAll();
        const newTreeData = buildNodes(profileList, null, "node");
        setTreeData(newTreeData);
        setProfiles(profileList);
      } catch (error) {
        console.error("Failed to load profile tree:", error);
      }
    };

    fetchData();
  }, [actionsDefault]);

  useEffect(() => {
    if (!loading && treeData.length > 0) {
      const newMyTree = new Tree("#treeView", {
        data: treeData,
      });

      myTree = newMyTree;

      updateDisabledField(disabledField);

      if (id) searchAPI(id);
    }
  }, [loading, treeData]);

  if (loading) return <div>Carregando...</div>;

  const commandAction = (actions) => {
    const hasPermission = roles.find(
      (role) => role.command === rolePageRequire
    );

    if (!hasPermission) {
      setActions(actionsDefault);
      return;
    }

    actions.create = true;

    if (!actions.change)
      actions.change = !hasPermission.actions.some(
        (action) => action.key === "Change"
      );

    setActions({ ...actions });
  };

  const searchAPI = async (id) => {
    if (!id) return;

    updateDisabledField(false);

    try {
      const [resultHeader, resultProfiles] = await Promise.all([
        Opervex.System.User.findId(id),
        Opervex.System.UserProfile.findUserId(id),
      ]);

      updateData({ header: resultHeader, profiles: resultProfiles });

      commandAction({ ...actionsDefault, create: false, change: false });

      updateDisabledField(true);
    } catch (error) {
      alert(`Erro na busca: ${error.message}`);
    }
  };

  const updateData = async (newData) => {
    try {
      // Early return if invalid data
      if (!myTree || !newData?.profiles?.length) {
        setData(newData || {});
        myTree.values = [];
        return;
      }

      setData(newData);
      const validNodeIds = [];

      // Cache profiles by code for faster lookup
      const profileMap = new Map();
      newData.profiles.forEach((profile) => {
        profileMap.set(profile.code, profile);
      });

      // Check each node in the tree
      for (const [id, node] of Object.entries(myTree.nodesById)) {
        const { attributes } = node;

        // Skip if node doesn't have required attributes
        if (!attributes?.parentCode || !attributes?.action?.key) continue;

        const profile = profileMap.get(attributes.parentCode);
        if (!profile) continue;

        // Check if action still exists in the profile
        const actionExists = profile.actions.some(
          (action) => action.key === attributes.action.key
        );

        if (actionExists) {
          validNodeIds.push(id);
        }
      }

      myTree.values = validNodeIds;
    } catch (error) {
      alert(error);
      console.error("Error updating tree data:", error);
      // Fallback to empty selection if error occurs
      myTree.values = [];
    }
  };

  const handleButtonCreate = () => {
    setData(dataDefault);
    commandAction({ ...actionsDefault, save: false });
    updateDisabledField(false);
  };

  const handleButtonCancel = () => {
    if (data.header.code === "") {
      setData(dataDefault);
      updateDisabledField(true);
      commandAction({ ...actionsDefault, create: false });
    } else {
      searchAPI(data.header.code);
    }
  };

  const handleButtonSave = async () => {
    var body = [];

    myTree.selectedNodes.forEach((selectedNode) => {
      const node = myTree.nodesById[selectedNode.id];

      const profile = profiles.find(
        (x) => x.code === node.attributes.parentCode
      );

      const action = profile?.actions.find(
        (x) =>
          x.key ===
          (node.attributes.action?.key || node.attributes.actionTop.key)
      );

      if (body.findIndex((x) => x.code === profile.code) === -1)
        body.push({ ...profile, actions: [] });

      body.find((x) => x.code === profile.code).actions.push(action);
    });

    try {
      const result = await Opervex.System.UserProfile.update(
        data.header.code,
        body
      );

      if (result.error) {
        alert(result.error);
        return;
      }

      await searchAPI(data.header.code);
      alert("Acessos atualizados com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao salvar: " + error.message);
    }
  };

  const handleButtonSearch = () => {
    setShowModal(true);
  };

  const handleButtonChange = () => {
    updateDisabledField(false);
    commandAction({ ...actionsDefault, save: false });
  };

  const handleSelectItem = async (item) => {
    if (item?.code) {
      await searchAPI(item.code);
    }

    setShowModal(false);
  };

  const updateDisabledField = async (action) => {
    setDisabledField(action);

    if (myTree) {
      var ids = [];

      for (const id in myTree.nodesById) ids.push(id);

      if (action) myTree.disables = ids;
      else myTree.disables = [];
    }
  };

  return (
    <Container className="mt-2">
      <Form>
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
                      value={data?.header?.code}
                      name="code"
                      disabled
                    />
                    <InputGroup.Text
                      size="sm"
                      as="button"
                      type="button"
                      onClick={handleButtonSearch}
                    >
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="username"
                    value={data?.header?.username}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="fullName"
                    value={data?.header?.fullName}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-2">
          <Card.Header>
            <h5>Acessos</h5>
          </Card.Header>
          <Card.Body>
            <div disabled={disabledField} id="treeView"></div>
          </Card.Body>
        </Card>
      </Form>
      <SearchHelp
        showModal={showModal}
        setShowModal={setShowModal}
        onSelectItem={handleSelectItem}
        urlData="/System/Users/SearchHelp"
        urlSchema="/System/Users/SearchHelp/Schema"
      />
    </Container>
  );
};

export default AccessProfile;
