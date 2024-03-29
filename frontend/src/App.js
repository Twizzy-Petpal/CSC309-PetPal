import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home/Index";
import Notification from "./pages/Notification/Index";
import Login from "./pages/Login/Index";
import Error404 from "./pages/Errors/404";
import Error403 from "./pages/Errors/403";
import ShelterList from "./pages/ShelterList/Index";
import ShelterDetails from "./pages/ShelterDetails/Index";
import ShelterReviews from "./pages/ShelterReviews/Index";
import BlogList from "./pages/BlogList/Index";
import BlogDetails from "./pages/BlogDetails/Index";
import BlogCreate from "./pages/BlogCreate/Index";
import BlogCreateContent from "./pages/BlogCreateContent/Index";

import ListingPage from "./pages/Listings/Index";
import Listing from "./pages/Listings/Listing";
import Search from "./pages/Search/Index";
import SearchResults from "./pages/Search/Results";
import Register from "./pages/Register/Index";
import Update from "./pages/Update/Index";

import ApplicationDetails from "./pages/ApplicationViewUpdate/Index";
import CreateApplication from "./pages/ApplicationCreate/Index";
import ListApplications from "./pages/ApplicationList/Index";
import ApplicationChat from "./pages/ApplicationChat/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Notifications pages */}
          <Route path="notifications" element={<Notification />} />
          {/* Notifications pages */}

          {/* Accounts pages */}
          <Route path="accounts" element={<Login />} />
          <Route path="accounts/registration" element={<Register />} />
          <Route path="accounts/:id" element={<Update />} />
          <Route path="shelters" element={<ShelterList />} />
          <Route path="shelters/:id" element={<ShelterDetails />} />
          <Route path="shelters/:id/reviews" element={<ShelterReviews />} />
          {/* Accounts pages */}

          {/* Blogs Pages */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/create" element={<BlogCreate />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="blogs/:id/create" element={<BlogCreateContent />} />
          {/* Blogs Pages */}

          {/* Listings pages */}
          <Route path="search" element={<Search />} />
          <Route path="listings" element={<SearchResults />} />
          <Route path="listings/create" element={<ListingPage />} />
          <Route path="listings/:id/update" element={<ListingPage />} />
          <Route path="listings/:id" element={<Listing />} />
          {/* Listings pages */}

          {/* Application Pages */}
          <Route path="listings/:petId/application" element={<CreateApplication />} />
          <Route path="applications/" element={<ListApplications />} />
          <Route path="applications/:id" element={<ApplicationDetails />} />
          <Route path="applications/:id/chat" element={<ApplicationChat />} />
          
          {/* ERROR404 MUST BE THE LAST ROUTE!!! PUT ALL OF YOUR ROUTES ABOVE THIS!!! */}
          <Route path="unauthorized" element={<Error403 />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);