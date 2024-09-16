import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
// import * as serviceWorkerRegistration from './serviceWorker';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id/:isPending" element={<TaskPage />} />
    </Routes>
  );
};

// serviceWorkerRegistration.register();

export default App;
