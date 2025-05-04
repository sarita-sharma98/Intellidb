// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";  // Assuming Login component is in the same folder
import EmployeePage from "./EmployeePage";  // Assuming EmployeePage component is in the same folder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/" element={<Login />} />  
      </Routes>
    </Router>
  );
}

export default App;
