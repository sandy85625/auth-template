import Link from 'next/link';

const ContactUs: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">

            {/* Newsletter Subscription */}
            <div className="mb-10 w-full md:w-1/2 p-4 shadow-lg rounded-md">
                {/* Replace this with the Substack embed code */}
                <div className="mt-4 flex-grow h-full text-center">
                <h2 className="text-2xl md:text-4xl mb-4">Subscribe to Our Newsletter</h2>
                <p className='text-sm md:text-lg mb-10'>Stay updated with our latest news and updates.</p>
                
                <iframe 
                    src="https://sandykpd.substack.com/embed" 
                    width="100%" 
                    height="100%" 
                    className='rounded'
                ></iframe>
                </div>
            </div>
            
            {/* Contact Us Button */}
            <div className="w-full md:w-1/2 p-4 text-center">
                <h2 className="text-2xl mb-4">Reach Out to Us</h2>
                <p>Have questions? Want to provide feedback? Click the button below to get in touch with us.</p>

                <Link href="https://forms.gle/uWGGGra5PpH5jjpLA" target='_blank'>
                    <p className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                        Contact Us
                    </p>
                </Link>
            </div>

        </div>
    );
}

export default ContactUs;
