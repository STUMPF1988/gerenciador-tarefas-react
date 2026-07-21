import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
  end?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: "Início",
    path: "/",
    icon: <HomeOutlinedIcon />,
    end: true,
  },
  {
    title: "Tarefas",
    path: "/tasks",
    icon: <ChecklistOutlinedIcon />,
    end: true,
  },
  {
    title: "Nova tarefa",
    path: "/tasks/new",
    icon: <AddTaskOutlinedIcon />,
  },
  {
    title: "Sobre",
    path: "/about",
    icon: <InfoOutlinedIcon />,
  },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Abrir menu"
            onClick={openDrawer}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              flexGrow: {
                xs: 1,
                md: 0,
              },
              mr: 4,
            }}
          >
            Gerenciador de Tarefas
          </Typography>

          <Box
            component="nav"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.end}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  px: 2,
                  borderRadius: 2,
                  opacity: 0.8,

                  "&:hover": {
                    opacity: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                  },

                  "&.active": {
                    opacity: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.18)",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <Box
          sx={{
            width: 280,
          }}
          role="presentation"
        >
          <Box
  sx={{
    px: 3,
    py: 3,
    borderBottom: 1,
    borderColor: "divider",
  }}
>
  <Typography
    variant="h6"
    sx={{ fontWeight: 700 }}
  >
    Task Manager
  </Typography>

  <Typography
    variant="body2"
    color="text.secondary"
  >
    Gerencie suas tarefas
  </Typography>
</Box>

          <List sx={{ p: 2 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.end}
                onClick={closeDrawer}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,

                  "&.active": {
                    color: "primary.main",
                    backgroundColor: "action.selected",

                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;