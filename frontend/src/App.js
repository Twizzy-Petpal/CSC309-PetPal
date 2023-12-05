import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home/Index";
import Notification from "./pages/Notification/Index";
import Error404 from "./pages/404/Index";
import ApplicationDetails from "./pages/ViewUpdateApplication/Index";
import ListingPage from "./pages/Listings/Index";
import Listing from "./pages/Listings/Listing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="applications/details/:id" element={<ApplicationDetails />} />
          <Route path="listings/update/:id" element={<ListingPage />} />
          <Route path="listings/view/:id" element={<Listing />} />
          <Route path="listings/create" element={<ListingPage />}>
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