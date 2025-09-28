import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaPaypal, FaRegCreditCard, FaUniversity } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const location = useLocation();
  const { formData } = location.state || {};

  const paymentMethods = [
    { name: 'Card', icon: <FaCreditCard /> },
    { name: 'Bank Transfer', icon: <FaUniversity /> },
    { name: 'PayPal', icon: <FaPaypal /> },
    { name: 'Payoneer', icon: <FaRegCreditCard /> },
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedMethod || !paymentAmount) {
      alert('Please select a payment method and enter the amount.');
      return;
    }
    alert(`Thank you for your payment of $${paymentAmount}! You have chosen to pay via ${selectedMethod}. A confirmation will be sent shortly to ${formData?.email || 'your email'}.`);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'Card':
        return (
          <div className="space-y-4">
            <input type="text" placeholder="Card Number" className="w-full p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
            <input type="text" placeholder="Cardholder Name" className="w-full p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/YY" className="p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
              <input type="text" placeholder="CVC" className="p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
            </div>
          </div>
        );
      case 'Bank Transfer':
        return (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm">Please transfer the payment to the following bank account and provide the transaction details to confirm the order.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Bank Name: ABC Bank</li>
              <li>Account Name: Your Name</li>
              <li>Account Number: 1234567890</li>
              <li>Swift Code: ABCDEFGH</li>
            </ul>
          </div>
        );
      case 'PayPal':
        return (
          <div className="space-y-4">
            <input type="email" placeholder="PayPal Email" className="w-full p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
            <p className="text-gray-300 text-sm">Please provide your PayPal email to receive a payment request.</p>
          </div>
        );
      case 'Payoneer':
        return (
          <div className="space-y-4">
            <input type="email" placeholder="Payoneer Email" className="w-full p-3 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d]" required />
            <p className="text-gray-300 text-sm">Please provide your Payoneer email to receive a payment request.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen py-24 px-4 md:px-16 bg-[#1f242d] text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#242a32] p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Choose Your <span className="text-[#7cf03d]">Payment Method</span>
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Securely complete your transaction.
        </p>

        <form onSubmit={handlePayment} className="space-y-8">
          {/* Payment Amount Input */}
          <div className="mb-6">
            <label htmlFor="paymentAmount" className="block text-gray-300 mb-2 font-semibold">
              Payment Amount
            </label>
            <input
              type="number"
              id="paymentAmount"
              name="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount (e.g., 1500)"
              className="w-full p-4 bg-[#1f242d] border border-gray-700 rounded-md focus:outline-none focus:border-[#7cf03d] transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.name}
                whileHover={{ scale: 1.05 }}
                className={`p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedMethod === method.name
                    ? 'bg-[#7cf03d] text-gray-900 border-2 border-[#7cf03d]'
                    : 'bg-[#1f242d] border-2 border-transparent hover:border-[#7cf03d]'
                }`}
                onClick={() => setSelectedMethod(method.name)}
              >
                <div className="text-4xl mb-2">{method.icon}</div>
                <span className="text-center font-semibold">{method.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Render the specific payment form/info based on selectedMethod */}
          {selectedMethod && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <div className="bg-[#1f242d] p-6 rounded-lg">
                {renderPaymentForm()}
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-4 bg-[#7cf03d] text-gray-900 font-bold rounded-lg shadow-lg hover:bg-[#6af52a] transition-colors duration-300"
          >
            Pay Now
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Payment;