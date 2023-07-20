import { useState } from 'react';

const newsItems = ['Early adopters program is live! Get upto 50% off on subscription!']; // Update with your own news items

export default function Landing() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit your form data to your server here
    alert('Form submitted');
  };

  return (
    <div>
      <div className="bg-gray-100 text-center py-4 overflow-x-auto whitespace-nowrap scroll-smooth">
        <span className="pr-4">Latest News:</span>
        {newsItems.map((newsItem, i) => (
            <span key={i} className="px-4 py-1 text-red-400 bg-black rounded-md">{newsItem}</span>
            ))}
      </div>
      <main className="text-center my-10">
        <h1 className="text-4xl font-bold">Welcome to Tickets</h1>
        <p className="my-6 text-xl">A digital platform for creating loyality program!</p>
      </main>
      <div className="bg-gray-100 py-10">
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-6 space-y-3"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
