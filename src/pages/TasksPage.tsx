import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
} from "@mui/material";

import Header from "../components/Header";
import TaskList from "../components/TaskList";

import { taskService } from "../services/taskService";

import type { Task } from "../types/Task";
import Footer from "../components/Footer";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedCompleted, setEditedCompleted] = useState(false);

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

  function handleOpenEditModal(task: Task) {
    setSelectedTask(task);
    setEditedTitle(task.title);
    setEditedCompleted(task.completed);
    setEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setEditModalOpen(false);
    setSelectedTask(null);
    setEditedTitle("");
    setEditedCompleted(false);
  }

  function handleOpenDeleteModal(task: Task) {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setDeleteModalOpen(false);
    setSelectedTask(null);
  }

  async function handleConfirmEdit() {
    if (!selectedTask || !editedTitle.trim()) {
      return;
    }

    try {
      const updatedTask = await taskService.update(
        selectedTask._id,
        {
          title: editedTitle.trim(),
          completed: editedCompleted,
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === selectedTask._id
            ? updatedTask
            : task
        )
      );

      handleCloseEditModal();
    } catch (error) {
      console.error(error);
      setError("Não foi possível editar a tarefa.");
    }
  }

  async function handleConfirmDelete() {
    if (!selectedTask) {
      return;
    }

    try {
      await taskService.delete(selectedTask._id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== selectedTask._id)
      );

      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
      setError("Não foi possível excluir a tarefa.");
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
          <Alert severity="error" sx={{ mb: 3 }}>
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
          <TaskList
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </Paper>

      <Dialog
        open={editModalOpen}
        onClose={handleCloseEditModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Editar tarefa</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Título da tarefa"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            sx={{ mt: 1 }}
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={editedCompleted}
                onChange={(event) =>
                  setEditedCompleted(event.target.checked)
                }
              />
            }
            label={editedCompleted ? "Concluída" : "Pendente"}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditModal}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmEdit}
            disabled={!editedTitle.trim()}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
      >
        <DialogTitle>Excluir tarefa</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir a tarefa{" "}
            <strong>{selectedTask?.title}</strong>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Footer
        title="Desenvolvido por Stumpf Tech"
        subtitle="2026"
      />
    </Box>
  );
}

export default TasksPage;