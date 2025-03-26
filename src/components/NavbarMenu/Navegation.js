// src/components/NavbarMenu/Navegation.js

import { CiSettings } from "react-icons/ci";
import { FaHome, FaBuilding } from "react-icons/fa";
import {
  MdOutlineSpaceDashboard,
  MdEmojiTransportation,
  MdOutlineAccountTree,
} from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { BiBarChart } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";

export default [
  {
    segment: "",
    title: "Home",
    icon: <FaHome />,
  },
  {
    segment: "Dashboard",
    title: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    kind: "header",
    title: "Operação",
  },
  {
    segment: "Register/SalesOrder",
    title: "Vendas",
    icon: <RiShoppingCartLine />,
  },
  {
    segment: "Register/ServiceOrder",
    title: "Ordem de Serviço",
    icon: <MdEmojiTransportation />,
    admin: true,
  },
  {
    kind: "header",
    title: "Manutenção",
  },
  {
    segment: "Register",
    title: "Cadastros",
    icon: <BiBarChart />,
    command: "REGISTRATION",
    children: [
      {
        segment: "Product",
        title: "Produtos",
        icon: <AiOutlineFileText />,
        command: "PRODUCTS",
      },
      {
        segment: "Service",
        title: "Serviços",
        icon: <AiOutlineFileText />,
        command: "SERVICES",
      },
    ],
  },
  {
    kind: "header",
    title: "Analítico",
  },
  {
    segment: "Report",
    title: "Relatórios",
    icon: <BiBarChart />,
    command: "REPORTS",
    children: [
      {
        segment: "GoodsMovement",
        title: "Movimentação",
        icon: <AiOutlineFileText />,
        command: "REPORT_GOODS_MOVEMENT",
      },
      {
        segment: "GoodsMovementFull",
        title: "Movimentação Completo",
        icon: <AiOutlineFileText />,
        command: "REPORT_GOODS_MOVEMENT_FULL",
      },
      {
        segment: "ServiceOrder",
        title: "Ordem de Serviço",
        icon: <AiOutlineFileText />,
        command: "REPORT_SERVICE_ORDER",
      },
      {
        segment: "Stock",
        title: "Estoque",
        icon: <AiOutlineFileText />,
        command: "REPORT_STOCK",
      },
      {
        segment: "StockSerial",
        title: "Estoque Serial",
        icon: <AiOutlineFileText />,
        command: "REPORT_STOCK_SERIAL",
      },
      {
        segment: "StockSerialDays",
        title: "Serial - Dias em Estoque",
        icon: <AiOutlineFileText />,
        command: "REPORT_SERIAL_DAYS_DEPOSIT",
      },
      {
        segment: "SalesOrder",
        title: "Ordens de Venda",
        icon: <AiOutlineFileText />,
        command: "REPORT_SALES_ORDER",
      },
    ],
  },
  {
    kind: "header",
    title: "Configuração",
  },
  {
    segment: "System",
    title: "Sistema",
    icon: <CiSettings />,
    children: [
      {
        segment: "AccessProfile",
        title: "Acessos",
        icon: <BiBarChart />,
        command: "USER_PROFILE",
      },
    ],
  },
  {
    segment: "Accounting",
    title: "Contabilidade",
    icon: <MdOutlineAccountTree />,
    children: [
      {
        segment: "Branch",
        title: "Empresa - Filial",
        icon: <FaBuilding />,
        command: "USER_PROFILE",
      },
    ],
  },
];
