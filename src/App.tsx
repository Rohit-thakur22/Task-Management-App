import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
// import * as serviceWorkerRegistration from './serviceWorker';

const App: React.FC = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
          (registration) => {
            console.log(
              "ServiceWorker registration successful: ",
              registration.scope
            );
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id/:isPending" element={<TaskPage />} />
    </Routes>
  );
};

// serviceWorkerRegistration.register();

export default App;
