"use client"

import { ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CallToAction: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <>
            <div className="relative h-[200px] md:h-[600px]"> {/* Adjust the height as needed */}

                {/* Image that fills its container */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Image src="/cta.jpg" alt="CTA Image" layout="fill" objectFit="cover" />
                </div>

            </div>
            <div className="flex flex-col md:flex-row items-center justify-around h-[200px] md:h-[400px] p-4 md:p-8 my-10 md:my-2">

                {/* Text Div */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h3 className="text-xl md:text-3xl mb-2 md:mb-8">
                        Try our NFT powered <br/><span  className="text-blue-500">customer loyalty program</span> tool for Free!
                    </h3>
                    <p className="text-md md:text-xl">
                        Upgrade for unlimited access!
                    </p>
                </div>
                
                {/* Signup Button */}
                <div className="flex items-center md:px-2">
                            <div 
                                onClick={() => {
                                    setLoading(true)
                                    router.push('/admin')
                                }}
                                className="flex items-center text-white bg-blue-500 py-2 md:py-3 px-4 md:px-6 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl mt-4 cursor-pointer group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Try for Free
                                        <ChevronRight className="w-6 h-6 ml-1 group-hover:text-white" />
                                    </>
                                )}
                            </div>
                        </div>
            </div>
            <div className="relative h-[200px] md:h-[600px]"> {/* Adjust the height as needed */}

                {/* Image that fills its container */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Image src="/cta2.jpg" alt="CTA Image" layout="fill" objectFit="cover" />
                </div>

            </div>
        </>
    );
}

export default CallToAction;
