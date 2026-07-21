import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

import Header from "../components/Header";
import TaskList from "../components/TaskList";

import { taskService } from "../services/taskService";

import type { Task } from "../types/Task";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await taskService.getAll();

      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Header
        title="Minhas tarefas"
        subtitle="Organize e acompanhe suas atividades"
        user="Daniele"
        version={1}
      />

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: {
            xs: 2,
            sm: 3,
          },
          borderRadius: 3,
        }}
      >

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && !error && (
          <Box sx={{ mt: 3 }}>
            <TaskList tasks={tasks} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default TasksPage;