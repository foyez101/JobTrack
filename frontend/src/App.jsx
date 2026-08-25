import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ padding: "1rem", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/add" element={<AddApplication />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;