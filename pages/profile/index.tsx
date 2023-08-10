import React, { useState } from 'react';
import ProfileCollection from '../../components/profile/ProfileCollections';
import ProfileNotifications from '../../components/profile/ProfileNotifications';
import ProfileLanding from '../../components/profile/ProfileLanding';
import CloseButton from '@mui/icons-material/Close'
import MenuButton from '@mui/icons-material/Menu'

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState('landing');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderMainContent = () => {
    switch (activeComponent) {
      case 'collections':
        return <ProfileCollection />;
      case 'notifications':
        return <ProfileNotifications />;
      case 'landing':
        return <ProfileLanding />;
      default:
        return <ProfileLanding />;
    }
  };

  return (
    <div className="flex md:flex-row flex-col min-h-screen overflow-y-scroll">
      <div className={`w-full md:w-1/4 bg-gray-200 p-4 overflow-y-auto transform md:transform-none transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="block w-full py-2 px-4 text-left md:hidden" onClick={() => setSidebarOpen(false)}>
          <CloseButton />
        </button>
        <p className='text-xl font-bold py-2 px-4'>My Profile</p>
        <button className="block w-full py-2 px-4 text-left" onClick={() => setActiveComponent('collections')}>
          My Collections
        </button>
        <button className="block w-full py-2 px-4 text-left" onClick={() => setActiveComponent('notifications')}>
          Notifications
        </button>
        <button className="block w-full py-2 px-4 text-left" onClick={() => setActiveComponent('landing')}>
          Settings
        </button>
      </div>
      <main className="w-full md:w-3/4">
        <button className="p-4 md:hidden" onClick={() => setSidebarOpen(true)}>
          <MenuButton />
        </button>
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Profile;
