import React from "react";
import TaskBoard from "../components/TaskBoard";
import Navbar from "../components/Navbar";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <TaskBoard />
    </>
  );
};

export default HomePage;
