import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import "./index.css";
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./auth";
import TaskSettings from "./pages/TaskSettings";

function App() {
  const { isAuthorized } = useAuth();
  const ProtectedLogin = () => {
    return isAuthorized ? (
      <Navigate to="/" />
    ) : (
      <AuthPage initialMethod="login" />
    );
  };
  const ProtectedRegister = () => {
    return isAuthorized ? (
      <Navigate to="/" />
    ) : (
      <AuthPage initialMethod="register" />
    );
  };

  return (
    <Routes>
      <Route path="/signin" element={<ProtectedLogin />} />
      <Route path="/signup" element={<ProtectedRegister />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/task-setting" element={<TaskSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
