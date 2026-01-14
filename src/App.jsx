import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GitSearchRepo from "./components/module/gitSearchRepo/gitSearchRepo";
import Map from "./components/module/map/map";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/gitSearchRepo" element={<GitSearchRepo />} />
          <Route path="/map" element={<Map />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/gitSearchRepo" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
