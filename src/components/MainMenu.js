import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarFooterAccount from "./SidebarFooterAccount";

import { Box, Paper, createTheme, Stack, Divider } from "@mui/material";

import { AppProvider, DashboardLayout, AccountPreview } from "@toolpad/core";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Home",
    icon: <HomeIcon />,
  },

  {
    segment: "Dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Register/Sales",
    title: "Vendas",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "Register/ServiceOrder",
    title: "Ordem de Serviço",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "Report",
    title: "Relatórios",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "GoodsMovement",
        title: "Movimentação",
        icon: <DescriptionIcon />,
      },
      {
        segment: "ServiceOrder",
        title: "Ordem de Serviço",
        icon: <DescriptionIcon />,
      },
      {
        segment: "Stock",
        title: "Estoque",
        icon: <DescriptionIcon />,
      },
      {
        segment: "StockSerial",
        title: "Estoque Serial",
        icon: <DescriptionIcon />,
      },
      {
        segment: "StockSerialDays",
        title: "Serial - Dias em Estoque",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "System",
    title: "Sistema",
    icon: <SettingsIcon />,
    children: [
      {
        segment: "AccessProfile",
        title: "Acessos",
        icon: <BarChartIcon />,
      },
    ],
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview variant={mini ? "condensed" : "expanded"} handleClick={handleClick} open={open} />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};

function PageContent({ router }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Paper sx={{ width: "100%", padding: 1 }}>{router}</Paper>
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function MainMenu(props) {
  const navigate = useNavigate(); // Hook de navegação
  const location = useLocation();
  const { window } = props;
  const { children } = props;
  const router = {};

  router.navigate = navigate;
  router.pathname = location.pathname;

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="../../logo_sem_fundo.png" />,
        title: "Opervex",
        homeUrl: "/toolpad/core/introduction",
      }}
    >
      <DashboardLayout slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}>
        <PageContent pathname={router.pathname} router={children} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

MainMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default MainMenu;
