import { useRouter } from "next/router";

const newsItems = ['Early adopters program is live! Get upto 50% off on subscription!'];

export default function Landing() {
  const router = useRouter();

  return (
    <>
    <div className="py-5 min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-400 md:px-10">
      <div className="text-center py-4 px-4 md:px-10 mx-4 md:mx-0 bg-white rounded-xl shadow-lg flex flex-wrap mb-4">
        <span className="pr-4 text-blue-800 font-semibold">Latest News:</span>
        {newsItems.map((newsItem, i) => (
          <span key={i} className="px-4 py-1 text-red-500 bg-black rounded-md inline-block m-1 shadow-md">{newsItem}</span>
        ))}
      </div>
      <main className="text-center py-16 px-4 md:px-10 bg-white rounded-xl shadow-lg mx-4 md:mx-auto mb-8 text-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">Welcome to Tickets</h1>
        <p className="my-6 text-lg md:text-xl text-gray-600">A digital platform for creating loyalty programs!</p>
      </main>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-10 mb-8">
        <button onClick={() => router.push('/')}
          className="w-full md:w-auto py-4 px-8 text-lg md:text-xl text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200">
          Book a Demo
        </button>
        <button onClick={() => router.push('/login')}
          className="w-full md:w-auto py-4 px-8 text-lg md:text-xl text-blue-600 bg-white border border-blue-600 rounded-xl shadow-lg hover:bg-blue-100 transition-colors duration-200">
          Already member?
        </button>
        <button onClick={() => router.push('/contact')}
          className="w-full md:w-auto py-4 px-8 text-lg md:text-xl text-blue-600 bg-white border border-blue-600 rounded-xl shadow-lg hover:bg-blue-100 transition-colors duration-200">
          Contact Us
        </button>
      </div>
    </div>
    </>
  );
}
