import { useState, type FormEvent } from "react";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void> | void;
  saving?: boolean;
}

function TaskForm({
  onAddTask,
  saving = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formattedTitle = title.trim();

    if (!formattedTitle || saving) {
      return;
    }

    await onAddTask(formattedTitle);

    setTitle("");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <TextField
        label="Título da tarefa"
        placeholder="Digite uma tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={saving}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        disabled={saving || !title.trim()}
        sx={{
          minWidth: 130,
          height: 56,
        }}
      >
        {saving ? (
          <CircularProgress size={22} />
        ) : (
          "Adicionar"
        )}
      </Button>
    </Box>
  );
}

export default TaskForm;