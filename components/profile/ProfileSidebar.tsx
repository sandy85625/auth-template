import { useState } from 'react';

interface SidebarProps {
  selectComponent: (componentName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="lg:hidden p-6" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-6 h-1 mb-1 bg-black" />
        <div className="w-6 h-1 mb-1 bg-black" />
        <div className="w-6 h-1 bg-black" />
      </button>
      <div className={`bg-gray-200 fixed top-16 left-0 z-10 transform transition-transform duration-300 ease-in-out w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-1/4`}>
        <button onClick={() => selectComponent('profile')} className="block p-4 text-lg">Profile</button>
        <button onClick={() => selectComponent('collections')} className="block p-4 text-lg">Collections</button>
        <button onClick={() => selectComponent('notifications')} className="block p-4 text-lg">Notifications</button>
      </div>
    </div>
  );
};

export default Sidebar;

