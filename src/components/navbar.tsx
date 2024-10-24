import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

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
		<nav className="relative mb-8 rounded-xl border border-white/10 bg-white/80 px-6 py-4 shadow-lg 
			backdrop-blur-lg transition-all duration-300 dark:bg-gray-800/80">
			<div className="flex items-center justify-between">
			{/* Logo */}
			<div className="relative">
				<a href="#" className="group flex items-center space-x-3">
					<svg 
					className="h-8 w-8 text-emerald-500 transition-transform duration-300 group-hover:rotate-12"
					viewBox="0 0 24 24" 
					fill="none" 
					xmlns="http://www.w3.org/2000/svg"
					>
					<path 
						d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round"
					/>
					<path 
						d="M12 6V12L16 14" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round"
					/>
					<path 
						d="M12 6C12 6 14 3.5 16.5 4C19 4.5 19 7 19 7" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round"
					/>
					<path 
						className="animate-pulse"
						d="M12 6C12 6 10 3.5 7.5 4C5 4.5 5 7 5 7" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round"
					/>
					</svg>
					<span className="relative text-2xl font-bold tracking-tight">
					<span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
						Pomodoro
					</span>
					<div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 
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
					after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 after:content-['']">
					Kaizen: Continuous improvement every day
					</span>
				</h1>
			</div>

			{/* Dark Mode Toggle */}
			<div className="flex items-center space-x-3">
				<button
					onClick={toggleDarkMode}
					className="group relative rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 
					shadow-lg transition-all duration-300 hover:shadow-xl hover:from-emerald-600 hover:to-teal-600"
					aria-label="Toggle Dark Mode"
				>
					{isDarkMode ? (
					<FiSun className="h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12" />
					) : (
					<FiMoon className="h-5 w-5 text-white transition-all duration-300 group-hover:-rotate-12" />
					)}
				</button>
				<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
					{isDarkMode ? 'Light Mode' : 'Dark Mode'}
				</span>
			</div>
			</div>
		</nav>
	);
}