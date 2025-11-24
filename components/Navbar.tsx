import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'intelligence', label: 'Home' },
    { id: 'champions', label: 'Champions' },
    { id: 'transfers', label: 'Mercado' },
    { id: 'tech', label: 'Tech' },
    { id: 'mascots', label: 'Mascotes' },
    { id: 'banter', label: 'Zoeira' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('intelligence')}>
            <div className="relative">
                <div className="absolute inset-0 bg-tesla-red blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-8 h-8 bg-tesla-red rounded-sm flex items-center justify-center relative z-10">
                    <span className="text-white font-bold font-display text-xl">W</span>
                </div>
            </div>
            <span className="text-white font-display font-bold text-xl tracking-widest group-hover:text-white/90 transition-colors">
                WORDBET<span className="text-xs align-top text-neon-green ml-1 animate-pulse">AI</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all tracking-wider uppercase font-display h-16 flex items-center group overflow-hidden`}
                >
                  <span className={`relative z-10 ${activeTab === item.id ? 'text-neon-green' : 'text-gray-400 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                  
                  {/* Active/Hover Indicator */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-neon-green transform origin-left transition-transform duration-300 ${
                    activeTab === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`}></span>
                  
                  {/* Glow Effect on Active */}
                  {activeTab === item.id && (
                    <span className="absolute inset-0 bg-neon-green/5 z-0"></span>
                  )}
                </button>
              ))}
              
              <a href="#" className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-sm text-sm font-bold transition-all border border-white/10 ml-4 hover:border-neon-green/50 hover:shadow-[0_0_10px_rgba(10,255,0,0.2)]">
                PREMIUM
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`${
                    activeTab === item.id ? 'text-neon-green bg-white/5' : 'text-gray-300 hover:text-white'
                  } block px-3 py-4 rounded-md text-base font-medium uppercase w-full text-left border-l-2 ${activeTab === item.id ? 'border-neon-green' : 'border-transparent'}`}
                >
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;