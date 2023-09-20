import React from 'react';
import { Zap } from 'lucide-react';

// Define the TypeScript interface for the feature
interface FeatureProps {
  title: string;
  description: string;
  comingsoon: boolean; 
}

const Feature: React.FC<FeatureProps> = ({ title, description, comingsoon }) => {
  return (
    <div className="border-2 border-secondary p-4 rounded-lg shadow-md m-2 md:m-4">
      <div className="flex items-center justify-start mb-2">
        <Zap className="mr-2" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="bg-gray-300 my-2" style={{height: '2px'}} />
      <p className="text-sm md:text-base">{description}</p>
      {comingsoon && 
        <>
            <div className="bg-gray-300 my-2" style={{height: '2px'}} />
            <p className="text-sm md:text-base">Coming soon</p>
        </>
      }
    </div>
  );
};

const FeaturesComponent: React.FC = () => {
    // Features list
  const features = [
    {
        title: "Customer Retention Analytics",
        description: "Advanced machine learning models predict customer churn, allowing businesses to offer timely incentives, thus reducing customer acquisition costs.",
        comingsoon: false
    },
    {
      title: "Personalised Rewards for each user",
      description: "Utilize advanced data analytics to tailor rewards based on individual purchasing habits and preferences, ensuring each user feels uniquely valued and is incentivized to engage more with the brand.",
      comingsoon: false
    },
    {
      title: "Automatic upgradation of Rewards",
      description: "Allow users to trade-in or upgrade their NFTs based on loyalty milestones or accumulated points. This fosters sustained engagement, as customers are motivated to reach higher tiers or obtain exclusive rewards.",
      comingsoon: false
    },
    {
        title: "Dynamic Pricing Models",
        description: "Utilize NFT-based purchase data to implement dynamic pricing strategies, optimizing revenue and adjusting to real-time market demand.",
        comingsoon: false
    },
    {
        title: "Cross-Promotional Opportunities",
        description: "Facilitate partnerships with complementary businesses, allowing for shared rewards or special deals, driving traffic and increasing sales.",
        comingsoon: false
    },
    {
        title: "Targeted Marketing Insights",
        description: "Access granular data on customer purchasing habits, enabling businesses to tailor marketing campaigns more effectively and increase ROI.",
        comingsoon: false
    },
    {
        title: "Reduced Payment Processing Fees",
        description: "By using blockchain for transactions, businesses can bypass traditional payment gateways, leading to significant savings on processing fees.",
        comingsoon: false
    },
    {
        title: "Subscription Mechanism",
        description: "Assist D2C brands in transitioning to a subscription model using NFTs, enabling recurring revenue and enhanced customer loyalty.",
        comingsoon: false
    },
      {
          title: "AI-Powered Product Recommendations",
          description: "Integrate AI to analyze NFT-based purchase histories, offering real-time personalized product recommendations to users, increasing cross-selling opportunities.",
          comingsoon: true
      },
      {
          title: "NFT Staking Rewards",
          description: "Allow users to 'stake' their loyalty NFTs in return for special rewards or interest. This ensures continued engagement and incentivizes long-term holding.",
          comingsoon: true
      },
      {
          title: "VR Shopping Experiences",
          description: "Offer unique virtual reality shopping events or experiences exclusively for NFT loyalty holders, merging the future of e-commerce with NFT exclusivity.",
          comingsoon: true
      },
      {
          title: "Blockchain-Based Referral System",
          description: "Implement a secure and transparent referral system using blockchain. Reward users with special NFTs when they bring in new members, driving organic growth.",
          comingsoon: true
      }  
]

  return (
    <div className='m-6'>
        <h2 className="m-4 text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
            <Feature key={index} {...feature} />
        ))}
        </div>
    </div>
  );
};

export default FeaturesComponent;
