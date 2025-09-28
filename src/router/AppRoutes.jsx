import About from "../Pages/About";
import BlogPage from "../Pages/BlogPage";
import BlogRead from "../Pages/BlogRead";
import Contact from "../Pages/Contact";
import FAQ from "../Pages/FAQ";
import Footer from "../components/layout/Footer";
import GetQuote from "../Pages/GetQuote";
import Home from "../Pages/Home";
import Navbar from "../components/layout/Navbar";
import Payment from "../Pages/Payment";
import PortfolioPage from "../Pages/PortfolioPage";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import React from "react";
import Resume from "../Pages/Resume";
import Service from "../Pages/Service";
import ServiceDetails from "../Pages/ServiceDetails";
import TermsOfService from "../Pages/TermsOfService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your page components

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-[#1f242d] text-white">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* সার্ভিস ডিটেইলস এর জন্য ডায়নামিক রুট যোগ করা হলো */}
            <Route path="/services-details/:id" element={<ServiceDetails />} />
            
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogRead />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
