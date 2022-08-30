import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditHV from "./components/AddEditHV/AddEditHV";
import LayOut from "./components/LayOut/LayOut";
import Hocvien from "./pages/Hocvien";
import Home from "./pages/Home";
import Lichthi from "./pages/Lichthi";
import TKB from "./pages/TKB";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        className="toast-position"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LayOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hocvien" element={<Hocvien />} />
          <Route path="/hocvien/add" element={<AddEditHV />} />
          <Route path="/lichthi" element={<Lichthi />} />
          <Route path="/tkb" element={<TKB />} />
        </Routes>
      </LayOut>
    </BrowserRouter>
  );
}

export default App;
