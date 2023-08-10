import React, { useState } from 'react';
import { ProfileFieldProps } from '../../../interfaces'

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, isSensitive = false, toBeCopied = false }) => {
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (reveal || !isSensitive) {
      navigator.clipboard.writeText(value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 items-center mb-4">
      <h2 className="font-bold text-gray-700">{label}:</h2>
      <div className='col-span-2 flex'>
        <p className="text-gray-600 pr-4 truncate w-2/3">{reveal || !isSensitive ? value : '••••••••'}</p>
        {toBeCopied && (<button onClick={handleCopyClick} className="text-blue-500 pr-2">
          {copied ? 'Copied!' : 'Copy'}
        </button>
        )}
        {isSensitive && (
          <button 
            onClick={() => setReveal(!reveal)} 
            className="text-red-500" 
            title={reveal ? 'Sensitive Information! Handle with care. Never reveal publicly' :  'Sensitive Information! Handle with care. Never reveal publicly'}
          >
            {reveal ? 'Hide' : 'Show (Sensitive Information! Never show publicly!)'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileField;
