// src/components/SearchHelp/index.js

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Opervex from "../../Opervex";
import FilterAccordion from "../Filter/FilterAccordion";
import SearchHelpTable from "./SearchHelpTable";

const SearchHelp = ({
  showModal,
  setShowModal,
  onSelectItem,
  urlData,
  urlSchema,
}) => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState(null);

  const fetchData = async () => {
    if (!layout) await getSchema();
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, [showModal]);

  const getSchema = async () => {
    try {
      const _layout = await Opervex.API.get(urlSchema);

      if (_layout?.error) setLayout([]);
      else setLayout(_layout);
    } catch (err) {
      setLayout([]);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pesquisar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilterAccordion
          layout={layout || []}
          setData={setData}
          urlData={urlData}
        />

        {/* Tabela Dinâmica */}
        <SearchHelpTable
          layout={layout || []}
          data={data || []}
          onSelectItem={onSelectItem}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SearchHelp;
