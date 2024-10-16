"use client"
import React from "react";

// Declare Razorpay on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/testing/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 1 }), // Amount in INR
      });

      const data = await response.json();
      if (response.ok) {
        // Initialize Razorpay payment
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Your Razorpay key
          amount: data.amount, // Amount in paise
          currency: data.currency,
          name: "Your Company Name",
          description: "Payment for your product/service",
          order_id: data.id, // Use the order_id returned from your API
          handler: (response:any) => {
            alert("Payment successful!");
            console.log(response);
          },
          theme: {
            color: "#F37254", // Customize button color
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handlePayment}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#F37254", // Button color
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d65a4a")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F37254")}
      >
        Pay 1 INR
      </button>
    </div>
  );
};

export default RazorpayPayment;
