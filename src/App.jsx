import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Customer from "./pages/Customer/CustomerPage";
import Agent from "./pages/Agent/AgentPage";
import TravelHomePage from "./pages/Travel/TravelHomePage";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CssBaseline />
              <TravelHomePage />
            </>
          }
        />
        <Route path="/customer" element={<Customer />} />
        <Route path="/agent" element={<Agent />} />
      </Routes>
    </Router>
  );
}

export default App;
