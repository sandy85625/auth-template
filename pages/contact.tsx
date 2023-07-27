import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-indigo-800 text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Email</h2>
        <p className="text-lg md:text-xl">contact@evoura.in</p>
      </div>
      <hr/>
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Address</h2>
        <p className="text-lg md:text-xl">Kithaganur, KR Puram, Bangalore, India - 560036</p>
      </div>
      <hr/>
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Phone Number</h2>
        <p className="text-lg md:text-xl">+91 8848063711</p>
      </div>
      <a href="https://wa.me/8848063711" target="_blank" rel="noreferrer" className="text-green-100 underline font-bold">
        Message us on WhatsApp
      </a>
    </div>
  );
}
