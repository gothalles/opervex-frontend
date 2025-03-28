// src/routes.js

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import SystemAccessProfile from "./pages/System/AccessProfile";

import AccountingBranch from "./pages/Accounting/Branch";

import RegisterServiceOrder from "./pages/Register/ServiceOrder";
import RegisterService from "./pages/Register/Service";
import RegisterProduct from "./pages/Register/Product";
import RegisterSalesOrder from "./pages/Register/SalesOrder";
import RegisterCategory from "./pages/Register/Category";

import ReportStock from "./pages/Reports/Stock";
import ReportStockSerial from "./pages/Reports/SockSerial";
import ReportStockSerialDays from "./pages/Reports/StockSerialDays";
import ReportGoodsMovement from "./pages/Reports/GoodsMovement";
import ReportGoodsMovementFull from "./pages/Reports/GoodsMovementFull";
import ReportServiceOrder from "./pages/Reports/ServiceOrder";
import ReportSalesOrder from "./pages/Reports/SalesOrder";

export default [
  {
    path: "/",
    private: true,
    component: <Home />,
  },
  {
    path: "/Login",
    private: false,
    component: <Login />,
  },
  {
    path: "/Logout",
    private: false,
    component: <Logout />,
  },
  {
    path: "/Dashboard",
    private: true,
    component: <Dashboard />,
    role: "",
  },
  // Report
  {
    path: "/Report/Stock",
    private: true,
    component: <ReportStock />,
    role: "REPORT_STOCK",
  },
  {
    path: "/Report/StockSerial",
    private: true,
    component: <ReportStockSerial />,
    role: "REPORT_STOCK_SERIAL",
  },
  {
    path: "/Report/StockSerialDays",
    private: true,
    component: <ReportStockSerialDays />,
    role: "REPORT_SERIAL_DAYS_DEPOSIT",
  },
  {
    path: "/Report/GoodsMovement",
    private: true,
    component: <ReportGoodsMovement />,
    role: "REPORT_GOODS_MOVEMENT",
  },
  {
    path: "/Report/GoodsMovementFull",
    private: true,
    component: <ReportGoodsMovementFull />,
    role: "REPORT_GOODS_MOVEMENT_FULL",
  },
  {
    path: "/Report/ServiceOrder",
    private: true,
    component: <ReportServiceOrder />,
    role: "REPORT_SERVICE_ORDER",
    admin: true,
  },
  {
    path: "/Report/SalesOrder",
    private: true,
    component: <ReportSalesOrder />,
    role: "REPORT_SALES_ORDER",
  },
  // Register - Product
  {
    path: "/Register/Product",
    private: true,
    component: <RegisterProduct />,
    role: "PRODUCTS",
  },
  {
    path: "/Register/Product/:id",
    private: true,
    component: <RegisterProduct />,
    role: "PRODUCTS",
  },

  // Register - Category
  {
    path: "/Register/Category",
    private: true,
    component: <RegisterCategory />,
    role: "CATEGORIES",
  },
  {
    path: "/Register/Category/:id",
    private: true,
    component: <RegisterCategory />,
    role: "CATEGORIES",
  },
  // Register - Service Order
  {
    path: "/Register/ServiceOrder",
    private: true,
    component: <RegisterServiceOrder />,
    role: "REPORT_SERVICE_ORDER",
  },
  {
    path: "/Register/ServiceOrder/:id",
    private: true,
    component: <RegisterServiceOrder />,
    role: "REPORT_SERVICE_ORDER",
  },
  // Register - Service
  {
    path: "/Register/Service",
    private: true,
    component: <RegisterService />,
    role: "SERVICES",
  },
  {
    path: "/Register/Service/:id",
    private: true,
    component: <RegisterService />,
    role: "SERVICES",
  },

  // Sales
  {
    path: "/Register/SalesOrder",
    private: true,
    component: <RegisterSalesOrder />,
    role: "SALES_ORDER",
  },
  {
    path: "/Register/SalesOrder/:id",
    private: true,
    component: <RegisterSalesOrder />,
    role: "SALES_ORDER",
  },

  // System - AccessProfile
  {
    path: "/System/AccessProfile",
    private: true,
    component: <SystemAccessProfile />,
    role: "USER_PROFILE",
  },
  {
    path: "/System/AccessProfile/:id",
    private: true,
    component: <SystemAccessProfile />,
    role: "USER_PROFILE",
  },

  // Accounting - Branch
  {
    path: "/Accounting/Branch",
    private: true,
    component: <AccountingBranch />,
    role: "BRANCH",
  },
  {
    path: "/Accounting/Branch/:id",
    private: true,
    component: <AccountingBranch />,
    role: "BRANCH",
  },
];
