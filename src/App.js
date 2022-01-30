import { Routes, Route, Navigate } from "react-router-dom";

import Ships from "./pages/Ships";
import ShipDetails from "./pages/ShipDetails";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Routes>
        <Route path="/" element={<Navigate to="all-shipments" />} />
        <Route path="all-shipments" element={<Ships />} />
        <Route path="shipment-details" element={<ShipDetails />} />
        <Route path="*" element={<Navigate to="all-shipments" />} />
      </Routes>
    </div>
  );
}

export default App;
