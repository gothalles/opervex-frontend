// src/components/LayoutConfigMenu.js

import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { CiSettings } from "react-icons/ci";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../context/AuthContext";
import OpervexAPI from "../Opervex";

const LayoutConfigMenu = ({ layout, setLayout, layoutName, urlSchema }) => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [idLayoutUser, setIdLayoutUser] = useState(null);
  const [tempLayout, setTempLayout] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setIdLayoutUser(`${layoutName}_${user.username}`);
      await getLayout();
    };

    fetchData();
  }, [user, idLayoutUser]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleResetLayout = async () => {
    const result = await getLayoutDefault();
    setTempLayout(result);
  };

  const saveLayoutUser = async () => {
    try {
      await OpervexAPI.Layouts.save({ id: idLayoutUser, items: tempLayout });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveLayout = async () => {
    setLayout(tempLayout);
    await saveLayoutUser();
    handleClose();
  };

  const getLayout = async () => {
    if (!user) return null;

    var savedLayout = await OpervexAPI.System.Layouts.findId(idLayoutUser);

    if (savedLayout) savedLayout = JSON.stringify(savedLayout.items);

    savedLayout = savedLayout
      ? JSON.parse(savedLayout)
      : await getLayoutDefault();

    setLayout(savedLayout || []);
    setTempLayout(savedLayout || []);
  };

  const getLayoutDefault = async () => {
    if (!user || !idLayoutUser) return null;

    try {
      return await OpervexAPI.API.get(urlSchema);
    } catch (err) {
      console.log("Erro ao carregar os dados:", err);
      return null;
    }
  };

  const handleToggleColumn = (key) => {
    setTempLayout(
      tempLayout.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedLayout = [...tempLayout];
    const [removed] = reorderedLayout.splice(result.source.index, 1);
    reorderedLayout.splice(result.destination.index, 0, removed);
    setTempLayout(reorderedLayout);
  };

  return (
    <>
      <div className="d-flex align-items-end">
        <Button variant="outline-secondary" onClick={handleShow}>
          <CiSettings />
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Configuração de Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  {tempLayout.map((col, index) => (
                    <Draggable
                      key={col.key}
                      draggableId={col.key}
                      index={index}
                    >
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Form.Check
                            type="checkbox"
                            label={col.label}
                            checked={col.visible}
                            onChange={() => handleToggleColumn(col.key)}
                          />
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveLayout}>
            Salvar Layout
          </Button>
          <Button variant="secondary" onClick={handleResetLayout}>
            Resetar Layout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LayoutConfigMenu;
