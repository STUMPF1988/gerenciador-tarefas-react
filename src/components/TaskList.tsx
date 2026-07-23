import type { Task } from "../types/Task";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Chip } from "@mui/material";

import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskList({
  tasks,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className="task-item">
          <div className="task-info">
            <span>{task.title}</span>

            <Chip
              label={
                task.completed
                  ? "Concluída"
                  : "Pendente"
              }
              color={
                task.completed
                  ? "success"
                  : "warning"
              }
              size="small"
            />
          </div>

          <div className="actions">
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label={`Editar tarefa ${task.title}`}
            >
              <FaEdit />
            </button>

            <button
              type="button"
              onClick={() => onDelete(task)}
              aria-label={`Excluir tarefa ${task.title}`}
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;