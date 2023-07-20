import React, { useState } from 'react';
import { ProfileFieldProps } from '../../../interfaces'

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, isSensitive = false }) => {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-4 items-center mb-4">
      <h2 className="font-bold text-gray-700">{label}:</h2>
      <div className='col-span-2 flex'>
      <p className="text-gray-600 pr-4 ">{reveal || !isSensitive ? value : '••••••••'}</p>
      {isSensitive && (
        <button 
          onClick={() => setReveal(!reveal)} 
          className="text-red-500" 
          title={reveal ? 'Sensitive Information! Handle with care. Never reveal publically' :  'Sensitive Information! Handle with care. Never reveal publically'}
        >
          {reveal ? 'Hide' : 'Show (Sensitive Information! Never show publically!)'}
        </button>
      )}
      </div>
    </div>
  );
};

export default ProfileField;
