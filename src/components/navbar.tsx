import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {

	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (isDarkMode) {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
	};


	return (
		<nav className="relative mb-8 rounded-xl border border-gray-200 bg-white/90 px-6 py-4 shadow-lg backdrop-blur-lg 
  transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800/90 dark:text-white">
  {/* Logo */}
  <div className="flex items-center justify-between">
    <div className="relative">
      <a href="#" className="group flex items-center space-x-2">
        <span className="relative text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Logo
          </span>
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 
            transition-all duration-300 group-hover:w-full"></div>
        </span>
      </a>
    </div>

    {/* Tagline */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <h1 className="text-lg font-medium tracking-wide text-gray-700 dark:text-gray-200">
        <span className="inline-block text-gray-400 dark:text-gray-500">改善</span>
        {" "}
        <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full 
          after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:content-['']">
          Kaizen: Continuous improvement every day
        </span>
      </h1>
    </div>

    {/* Dark Mode Toggle */}
    <div className="flex items-center space-x-3">
      <button
        onClick={toggleDarkMode}
        className="group relative rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2 
          shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Toggle Dark Mode"
      >
        <div className="absolute inset-0 rotate-0 transform rounded-full bg-gradient-to-r from-yellow-400 
          to-orange-500 opacity-0 transition-all duration-500 dark:rotate-180 dark:opacity-100"></div>
        
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-6 w-6 rotate-0 transform text-white transition-all duration-500 dark:rotate-180 
            dark:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2 top-2 h-6 w-6 rotate-180 transform text-white opacity-0 transition-all 
            duration-500 dark:rotate-0 dark:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </div>
  </div>
</nav>
	);
}