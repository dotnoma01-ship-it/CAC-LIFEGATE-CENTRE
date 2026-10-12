import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Ministries from "./pages/Ministries";
import Programs from "./pages/Programs";
import Sermons from "./pages/Sermons";
import Hymns from "./pages/Hymns";
import Gallery from "./pages/Gallery";
import AlbumAdmin from "./pages/AlbumAdmin";
import Leadership from "./pages/Leadership";
import Give from "./pages/Give";
import Prayer from "./pages/Prayer";
import Contact from "./pages/Contact";

import MobileNav from "./components/MobileNav";
import HymnViewer from "./pages/HymnViewer";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/hymns" element={<Hymns />} />
        <Route path="/hymns/:number" element={<HymnViewer />} />
        <Route path="/gallery" element={<Gallery />} />
<Route path="/admin/albums" element={<AlbumAdmin />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/give" element={<Give />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <MobileNav />

    </BrowserRouter>
  );
}

export default App;