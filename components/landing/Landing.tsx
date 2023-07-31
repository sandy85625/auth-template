import { useRouter } from "next/router";
import { useMediaQuery } from 'react-responsive';

type LatestNewsProps = {
  newsItems: string[];
};

type HeroProps = {
  title: string;
  subTitle: string;
};

const newsItems = ['Early adopters program is live! Get flat lifetime 50% off on subscription!'];

export default function Landing() {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' });

  // LatestNews Component
  const LatestNews = ({ newsItems }: LatestNewsProps) => (
    <div className="text-center py-4 px-4 md:px-10 md:mx-0 bg-white text-black rounded-xl shadow-lg flex flex-wrap">
      <span className="pr-4 text-2xl font-semibold">Latest News:</span>
      {newsItems.map((newsItem, i) => (
        <span key={i} className="px-4 py-1 text-white bg-red-500 rounded-md inline-block m-1 shadow-md">{newsItem}</span>
      ))}
    </div>
  );

  // Hero Component
  const Hero = ({ title, subTitle }: HeroProps) => (
    <section className={`flex flex-col justify-center items-center h-screen text-white rounded-xl md:mx-auto ${isTabletOrMobile ? 'text-center' : 'text-center'}`}>
      <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-12`}>{title}</h1>
      <p className={`text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}>{subTitle}</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <button onClick={() => router.push('https://l4tpnnnmy7q.typeform.com/to/lyL9jTSc')}
          className="w-full sm:w-auto py-4 px-8 text-lg sm:text-xl font-semibold bg-white text-blue-600 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-200">
          Book a Demo
        </button>
        <button onClick={() => router.push('/login')}
          className="w-full sm:w-auto py-4 px-8 text-lg sm:text-xl font-semibold bg-white text-blue-600 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-200">
          Already a member?
        </button>
        <button onClick={() => router.push('/contact')}
          className="w-full sm:w-auto py-4 px-8 text-lg sm:text-xl font-semibold bg-white text-blue-600 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-100 transition-all duration-200">
          Contact Us
        </button>
      </div>
    </section>
  );

  return (
    <div className="p-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-screen">
    <LatestNews newsItems={newsItems} />
    <Hero 
      title="Transform your customer engagement with Tickets" 
      subTitle="Create exclusive NFT-powered private club for your most loyal customers and fans." 
      />
  </div>
  );
}
