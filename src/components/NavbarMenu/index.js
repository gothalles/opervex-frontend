// src/components/NavbarMenu/index.js

import React, { useState, useEffect } from "react";
import { Navbar, Button, Offcanvas, Container, Nav } from "react-bootstrap";
import { List } from "lucide-react";
import NAVIGATION from "./Navegation";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { useAuth } from "../../context/AuthContext";
import "./NavbarMenu.css"; // Importando o arquivo CSS

// Função para filtrar a navegação com base nas roles do usuário
const filterNavigation = (navigation, roles) => {
  if (!roles) return [];
  return navigation.reduce((filtered, item) => {
    if (item.command && !roles.some((x) => x.command === item.command)) return filtered;
    if (item.children) {
      const filteredChildren = filterNavigation(item.children, roles);
      if (filteredChildren.length > 0) {
        filtered.push({ ...item, children: filteredChildren });
      }
    } else {
      filtered.push(item);
    }
    return filtered;
  }, []);
};

// Componente SubMenu para itens com subitens
const SubMenu = ({ itemSubMenu, segmentTop }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <div>
      <NavItem onClick={toggle}>
        <NavLink className="d-flex align-items-center px-3 menu-link">
          <div className="menu-link2">
            <span className="me-2">{itemSubMenu.icon}</span>
            <span>{itemSubMenu.title} </span>
          </div>
        </NavLink>
      </NavItem>
      <div className="menu-link2">
        <Collapse isOpen={!collapsed} navbar>
          {itemSubMenu.children.map((item, index) =>
            item.children ? (
              <SubMenu key={index} itemSubMenu={item} segmentTop={"/" + segmentTop + "/" + item.segment} />
            ) : (
              <NavItem key={index}>
                <NavLink href={segmentTop + "/" + item.segment} className="d-flex align-items-center menu-link">
                  <div className="menu-link2">
                    <span className="me-2">{item.icon}</span>
                    <span>{item.title} </span>
                  </div>
                </NavLink>
              </NavItem>
            )
          )}
        </Collapse>
      </div>
    </div>
  );
};

// Componente principal NavbarMenu
const NavbarMenu = () => {
  const { roles } = useAuth();
  const [show, setShow] = useState(false);
  const [filteredNavigation, setFilteredNavigation] = useState([]);

  useEffect(() => {
    setFilteredNavigation(filterNavigation(NAVIGATION, roles));
  }, [roles]);

  // Função para renderizar a navegação
  const renderNavigation = (items) =>
    items.map((item, index) => {
      if (item.kind === "header") {
        return (
          <div key={index} className="menu-header">
            <h6>{item.title}</h6>
          </div>
        );
      }
      return item.children ? (
        <SubMenu key={index} itemSubMenu={item} segmentTop={"/" + item.segment} />
      ) : (
        <Nav.Link key={index} href={"/" + item.segment} className="menu-link">
          <div className="menu-link2">
            <span className="me-2">{item.icon}</span>
            <span>{item.title} </span>
          </div>
        </Nav.Link>
      );
    });

  return (
    <>
      <Navbar className="menu-navbar">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <Button onClick={() => setShow(true)} variant="link" className="menu-button">
              <List size={28} className="text-dark" />
            </Button>
            <img alt="Opervex Logo" src="/logo_sem_fundo.png" width="40" height="40" className="d-inline-block align-top" />
            <span className="fw-bold text-primary">Opervex</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start" className="menu-offcanvas">
        <Offcanvas.Header closeButton className="menu-header">
          <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column menu-body">{renderNavigation(filteredNavigation)}</Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarMenu;
