import Navbar from "../components/Navbar"
import Home from "../components/Home";
import Premium from "../components/Premium";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
