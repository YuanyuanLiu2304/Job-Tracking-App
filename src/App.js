import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Login, Dashboard } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
