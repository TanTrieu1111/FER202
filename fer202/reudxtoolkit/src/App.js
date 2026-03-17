import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ExpensesDashboard from "./pages/ExpenseDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ExpensesDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;