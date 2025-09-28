import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // You can add your subscription logic here, like sending the email to an API
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section id="newsletter" className="py-20 px-6 md:px-12 bg-[#1f242d] text-white">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#7cf03d]">Subscribe to our Newsletter</h2>
        <p className="text-lg text-gray-400 mb-8">
          Stay updated with the latest news, articles, and projects directly in your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 px-6 py-3 rounded-full bg-[#2a2f3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7cf03d] transition-colors duration-300"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 px-8 py-3 bg-[#7cf03d] text-[#1f242d] font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-transparent hover:text-[#7cf03d] hover:shadow-none border-2 border-[#7cf03d]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
