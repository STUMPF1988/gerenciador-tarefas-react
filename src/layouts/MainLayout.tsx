import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Navbar />

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;