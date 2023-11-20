import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Copyright from "../components/Copyright";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChatIcon from "@mui/icons-material/Chat";
import { getUserByEmail } from "../services/user";
import { getUserEmail } from "../services/LocalStorage";
import { io } from "socket.io-client";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      width: theme.spacing(7),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (location.pathname == "/user-profile") {
      navigate("profile");
    }
    getUserByEmail(getUserEmail()).then((user) => {
      setName(`${user[0]?.firstName} ${user[0]?.lastName}`);
    });
  }, []);

  // ...

  // ...

  // ...

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f8f8f8", // Light background color
          color: "#333", // Font color
          fontFamily: "'Helvetica Neue', Arial, sans-serif", // Clean sans-serif font
        }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar color="secondary" />
            <Typography
              ml={2}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontSize: "1.2rem", // Font size
              }}
            >
              {name}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                {/* Replace with your own icon */}
                <div>Icon</div>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* List items with Apple-style minimalistic design */}
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#e5e5e5", // Lighter background color on hover
                },
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>
                <a
                  href="/user-profile/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </a>
              </ListItemText>
            </ListItem>

            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#e5e5e5",
                },
              }}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText>
                <a
                  href="/user-profile/chat"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Chat
                </a>
              </ListItemText>
            </ListItem>

            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#e5e5e5",
                },
              }}
            >
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>
                <a
                  href="/user-profile/panier"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Shopping Cart
                </a>
              </ListItemText>
            </ListItem>

            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#e5e5e5",
                },
              }}
            >
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText>
                <a
                  href="/user-profile/reservation"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Reservation
                </a>
              </ListItemText>
            </ListItem>

            {/* Add more items as needed */}

            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export function Layout() {
  return <DashboardContent />;
}
