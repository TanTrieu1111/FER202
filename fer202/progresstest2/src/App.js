import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginForm />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ExpenseDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;