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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getCoachByEmail } from "../services/Trainer";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const credentials = useAuth();
  const [coach, setCoach] = useState({});
  useEffect(() => {
    getCoachByEmail(credentials?.auth?.user).then((data) => {
      setCoach(data[0]);
    });
  }, []);
  useEffect(() => {
    if (location.pathname == "/trainer-profile") {
      navigate("summary");
    }
  }, []);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
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
            <Avatar src={coach?.picture?.src} />
            <Typography
              ml={5}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {coach?.lastName + "  " + coach?.firstName}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
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
            <ListItem>
              <ListItemIcon>
                <CalendarMonthIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                <Link
                  component="a"
                  href="/trainer-profile/calendar"
                  variant="subtitle1"
                  underline="none"
                >
                  Calender
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BorderColorIcon color="primary" />
              </ListItemIcon>
              <ListItemText xs={{ fontSize: "10rem" }}>
                <Link
                  component="a"
                  href="/trainer-profile/reservations"
                  variant="subtitle1"
                  underline="none"
                >
                  Reservations
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BorderColorIcon color="primary" />
              </ListItemIcon>
              <ListItemText xs={{ fontSize: "10rem" }}>
                <Link
                  component="a"
                  href="/user-profile/chat"
                  variant="subtitle1"
                  underline="none"
                >
                  Chat
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText xs={{ fontSize: "10rem" }}>
                <Link
                  component="a"
                  href="/trainer-profile/summary"
                  variant="subtitle1"
                  underline="none"
                >
                  Summary
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MenuBookIcon color="primary" />
              </ListItemIcon>
              <ListItemText xs={{ fontSize: "10rem" }}>
                <Link
                  component="a"
                  href="/trainer-profile/courses"
                  variant="subtitle1"
                  underline="none"
                >
                  Courses
                </Link>
              </ListItemText>
            </ListItem>
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
            <Outlet></Outlet>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export function Layout() {
  return <DashboardContent />;
}
