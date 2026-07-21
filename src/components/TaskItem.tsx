import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      <span>{task.completed ? "✅" : "⬜"}</span>

      <span>{task.title}</span>
    </li>
  );
}

export default TaskItem;