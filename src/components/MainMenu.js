import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import { Paper, createTheme } from "@mui/material";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useLocation } from "react-router-dom";

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
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  //{
  //  segment: "orders",
  //  title: "Orders",
  //  icon: <ShoppingCartIcon />,
  //},
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "Report",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "Stock",
        title: "Estoque",
        icon: <DescriptionIcon />,
      },
      {
        segment: "GoodsMovementHistory",
        title: "Movimentação - Serial",
        icon: <DescriptionIcon />,
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

function PageContent({ pathname, router }) {
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
      {/*<Typography>Dashboard content for {pathname}</Typography> */}

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

  const [session, setSession] = React.useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
        navigate("/logout");
      },
    };
  }, []);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
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
