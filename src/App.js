import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Reset, Dashboard, Rating } from "./views";
require("typeface-playfair-display");

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/rating" element={<Rating />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
