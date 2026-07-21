import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{
          fontWeight: 700,
          fontSize: {
            xs: "5rem",
            md: "8rem",
          },
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 1, fontWeight: 600 }}
      >
        Página não encontrada
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: 500,
        }}
      >
        A página acessada não existe ou foi movida.
      </Typography>

      <Button
        variant="contained"
        startIcon={<HomeOutlinedIcon />}
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </Box>
  );
}

export default NotFoundPage;