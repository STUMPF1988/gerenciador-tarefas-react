import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import TaskChart from "../components/TaskChart";
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";
import Footer from "../components/Footer";

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const tasksFromApi = await taskService.getAll();

        setTasks(tasksFromApi);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 4,
          mb: 4,
          textAlign: "center",
        }}
      >
        Minhas Tarefas
      </Typography>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TaskChart tasks={tasks} />
        </Box>
      )}

      <Footer
        title="Desenvolvido por Stumpf Tech"
        subtitle="2026"
      />
    </Container>
  );
}

export default HomePage;