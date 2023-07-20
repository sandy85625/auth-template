import React from 'react';

type ComingSoonProps = {
    
};

const ComingSoon:React.FC<ComingSoonProps> = () => {
    
    return (
        <div className="grid grid-cols-3 gap-6">
        <p className="col-span-3 text-center text-gray-600">Coming soon!</p>
        {/* Render your already created cards here */}
        </div>
    )
}
export default ComingSoon;