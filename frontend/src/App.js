import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home/Index";
import Notification from "./pages/Notification/Index";
import Error404 from "./pages/404/Index";
import ListingPage from "./pages/Listings/Index";
import Listing from "./pages/Listings/Listing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="listing/:id/update" element={<ListingPage />} />
          <Route path="listing/:id" element={<Listing />} />
          <Route path="listing" element={<ListingPage />}>
          </Route>


          {/* ERROR404 MUST BE THE LAST ROUTE!!! PUT ALL OF YOUR ROUTES ABOVE THIS!!! */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);