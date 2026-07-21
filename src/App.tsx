import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NewTaskPage from "./pages/NewTaskPage";
import TasksPage from "./pages/TasksPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/tasks" element={<TasksPage />} />

        <Route
          path="/tasks/new"
          element={<NewTaskPage />}
        />

        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;