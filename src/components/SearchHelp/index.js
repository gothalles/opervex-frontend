import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Opervex from "../../utils/Opervex";
import FilterAccordion from "../Filter/FilterAccordion";
import SearchHelpTable from "./SearchHelpTable";

const SearchHelp = ({ showModal, setShowModal, onSelectItem, urlData, urlSchema }) => {
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
      setLayout(await Opervex.API.get(urlSchema));
    } catch (err) {
      console.log("Erro ao carregar os dados:", err);
      setLayout([]);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pesquisar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilterAccordion layout={layout || []} setData={setData} urlData={urlData} />

        {/* Tabela Dinâmica */}
        <SearchHelpTable layout={layout || []} data={data || []} onSelectItem={onSelectItem} />
      </Modal.Body>
    </Modal>
  );
};

export default SearchHelp;
