import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Hocvien from "./pages/Hocvien";
import Home from "./pages/Home";
import Licthi from "./pages/Licthi";
import TKB from "./pages/TKB";

function App() {
  return (
    <BrowserRouter>
      <LayOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hocvien" element={<Hocvien />} />
          <Route path="/lichthi" element={<Licthi />} />
          <Route path="/tkb" element={<TKB />} />
        </Routes>
      </LayOut>
    </BrowserRouter>
  );
}

export default App;
