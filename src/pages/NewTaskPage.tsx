import { useState } from "react";
import { useNavigate } from "react-router";

import { Alert, Box, Paper, Typography } from "@mui/material";

import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import { taskService } from "../services/taskService";

function NewTaskPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function addTask(title: string) {
    try {
      setSaving(true);
      setError("");

      await taskService.create(title);

      navigate("/tasks");
    } catch (error) {
      console.error(error);
      setError("Não foi possível adicionar a tarefa.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box>
      <Header
        title="Adicionar tarefa"
        subtitle="Cadastre uma nova tarefa"
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
            md: 4,
          },
          borderRadius: 3,
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Dados da tarefa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TaskForm
          onAddTask={addTask}
          saving={saving}
        />
      </Paper>
    </Box>
  );
}

export default NewTaskPage;