import { Box, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import type { Task } from "../types/Task";

interface TaskChartProps {
  tasks: Task[];
}

function TaskChart({ tasks }: TaskChartProps) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const totalTasks = tasks.length;

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 500,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          textAlign: "center",
        }}
      >
        Situação das tarefas
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          textAlign: "center",
        }}
      >
        Total de tarefas: {totalTasks}
      </Typography>

      {totalTasks === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          Nenhuma tarefa cadastrada.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: completedTasks,
                    label: "Concluídas",
                  },
                  {
                    id: 1,
                    value: pendingTasks,
                    label: "Pendentes",
                  },
                ],
              },
            ]}
            width={400}
            height={250}
          />
        </Box>
      )}
    </Paper>
  );
}

export default TaskChart;