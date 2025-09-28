import "./style.css";
import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// clients/contact.jsx

// আপনার সার্ভার API এর বেস URL
const API_BASE_URL = "VITE_API_URL=https://personal-server-uf48.onrender.com"; // আপনার সার্ভারের URL দিন

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  // ফর্ম ফিল্ড পরিবর্তন হ্যান্ডেলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ফর্ম জমা দেওয়া (Submit) হ্যান্ডেলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: null, message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          loading: false,
          success: true,
          message: data.message || "Message sent successfully!",
        });
        setFormData({
          // ফর্ম রিসেট
          fullName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        // সার্ভার থেকে আসা validation error হ্যান্ডেল
        setSubmitStatus({
          loading: false,
          success: false,
          message: data.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus({
        loading: false,
        success: false,
        message: "Network error. Please try again later.",
      });
    }
  };

  return (
    <section className="contact py-24 px-4 md:px-16 lg:px-24 bg-gray-900 text-white">
      <div className="contact-container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Contact Details (No change needed here) */}
        {/* ... (Existing code for contact details) ... */}
        <div className="contact-box self-center">
          <h2 className="text-4xl md:text-5xl font-bold">Let's Work Together</h2>
          <p className="desc text-base mt-4 mb-6 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis tempore aperiam quia explicabo blanditiis.
          </p>
          <div className="contact-detail flex items-center my-6">
            <div className="icon-box p-3 bg-gray-800 text-green-400 rounded-md mr-4 text-2xl">
              <FaPhoneAlt />
            </div>
            <div className="detail">
              <p className="text-sm text-green-400">Phone</p>
              <p className="text-lg">(+880) 183 88 431 36</p>
            </div>
          </div>
          <div className="contact-detail flex items-center my-6">
            <div className="icon-box p-3 bg-gray-800 text-green-400 rounded-md mr-4 text-2xl">
              <FaEnvelope />
            </div>
            <div className="detail">
              <p className="text-sm text-green-400">Email</p>
              <p className="text-lg">youremail123@gmail.com</p>
            </div>
          </div>
          <div className="contact-detail flex items-center my-6">
            <div className="icon-box p-3 bg-gray-800 text-green-400 rounded-md mr-4 text-2xl">
              <FaMapMarkerAlt />
            </div>
            <div className="detail">
              <p className="text-sm text-green-400">Address</p>
              <p className="text-lg">Maijdee Noakhali Bangladesh</p>
            </div>
          </div>
        </div>


        {/* Right Side: Contact Form (Changes here) */}
        <div className="contact-box bg-gray-800 p-8 rounded-xl text-center">
          <h2 className="headding text-3xl font-bold mb-8">
            Contact <span className="text-green-400">Me!</span>
          </h2>

          {/* Submission Status Message */}
          {submitStatus.message && (
            <div
              className={`p-3 mb-4 rounded-md font-medium ${
                submitStatus.success ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field-box grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 bg-gray-900 border border-gray-900 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-gray-900 border border-gray-900 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-4 bg-gray-900 border border-gray-900 rounded-md focus:outline-none focus:border-green-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Email Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 bg-gray-900 border border-gray-900 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                required
              />
              <textarea
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-36 md:h-64 p-4 bg-gray-900 border border-gray-900 rounded-md focus:outline-none focus:border-green-400 transition-colors col-span-1 md:col-span-2 resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitStatus.loading}
              className={`btn px-6 py-3 mt-8 font-bold rounded-lg transition-colors cursor-pointer ${
                submitStatus.loading
                  ? "bg-green-700 text-gray-400 cursor-not-allowed"
                  : "bg-green-400 text-gray-900 hover:bg-green-500"
              }`}
            >
              {submitStatus.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;