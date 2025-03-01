// components/LayoutConfigMenu.js
import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../context/AuthContext";
import OpervexAPI from "../utils/OpervexAPI";

const LayoutConfigMenu = ({ layout, setLayout, layoutName, urlSchema }) => {
  const { user } = useAuth(); // Pega usuário do contexto
  const [anchorLayout, setAnchorLayout] = useState(null);
  const openLayout = Boolean(anchorLayout);
  const [idLayoutUser, setIdLayoutUser] = useState(null);
  const [tempLayout, setTempLayout] = useState([]); // Estado temporário

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setIdLayoutUser(layoutName + "_" + user.username);

      await getLayout();
    };

    fetchData();
  }, [user, idLayoutUser]);

  const handleOpenLayout = (event) => {
    //setAnchorLayout(true);
    setAnchorLayout(event.currentTarget);
  };

  const handleCloseLayout = () => {
    //setTempLayout(layout);
    setAnchorLayout(false);
  };

  // Resetar layout para padrão
  const handleResetLayout = async () => {
    const result = await getLayoutDefault();

    setTempLayout(result);
    //localStorage.setItem("reportLayout", JSON.stringify(result));
  };

  // Save Layout User
  const saveLayoutUser = async () => {
    const dataBody = { id: idLayoutUser, items: tempLayout };

    try {
      const response = await OpervexAPI.post("/System/Layouts/", dataBody);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleSaveLayout = async () => {
    setLayout(tempLayout);

    await saveLayoutUser();

    handleCloseLayout();
  };

  const getLayout = async () => {
    var savedLayout = await getLayoutUser();

    savedLayout = savedLayout ? JSON.parse(savedLayout) : null;

    if (!savedLayout) {
      savedLayout = await getLayoutDefault(); // Aguarde o carregamento
    }

    setLayout(savedLayout || []);
    setTempLayout(savedLayout || []); // Também define o layout temporário
  };

  const getLayoutUser = async () => {
    if (!user || !idLayoutUser) return null;

    try {
      const result = await OpervexAPI.get(`/System/Layouts/${idLayoutUser}`);

      return JSON.stringify(result.items);
    } catch (err) {
      //console.log("Erro ao carregar os dados:", err);
      return null;
    }
  };

  const getLayoutDefault = async () => {
    if (!user || !idLayoutUser) return null;

    try {
      const result = await OpervexAPI.get(urlSchema);

      return result;
    } catch (err) {
      console.log("Erro ao carregar os dados:\n\n", err);
      return null;
    }
  };

  // Atualizar visibilidade das colunas
  const handleToggleColumn = (key) => {
    const updatedLayout = tempLayout.map((col) => (col.key === key ? { ...col, visible: !col.visible } : col));
    setTempLayout(updatedLayout);
  };

  // Função para reorganizar as colunas
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedLayout = Array.from(tempLayout);
    const [removed] = reorderedLayout.splice(source.index, 1);
    reorderedLayout.splice(destination.index, 0, removed);

    setTempLayout(reorderedLayout);
  };

  return (
    <>
      <IconButton onClick={handleOpenLayout}>
        <SettingsIcon />
      </IconButton>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Menu anchorEl={anchorLayout} open={openLayout} onClose={handleCloseLayout} keepMounted>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tempLayout.map((col, index) => (
                  <Draggable key={col.key} draggableId={col.key} index={index}>
                    {(provided) => (
                      <MenuItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={col.key}>
                        <FormControlLabel
                          control={<Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.key)} />}
                          label={col.label}
                        />
                      </MenuItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <MenuItem>
            <Stack direction="row" spacing={2}>
              <Button color="success" variant="outlined" onClick={handleSaveLayout}>
                Salvar Layout
              </Button>
              <Button variant="outlined" onClick={handleResetLayout}>
                Resetar Layout
              </Button>
            </Stack>
          </MenuItem>
        </Menu>
      </DragDropContext>
    </>
  );
};

export default LayoutConfigMenu;
