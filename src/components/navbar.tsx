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
		<nav className='container flex justify-between items-center w-full mx-auto py-4 px-6 bg-white dark:bg-gray-800 dark:text-white text-black border border-gray-800 rounded-lg'>
			<div className='text-2xl font-bold'>
					<a href="#">
						Logo
					</a>
			</div>
			<div className='text-center dark:bg-gray-800 dark:text-white'>
				<h1>
					Kaizen: Continuous improvement every day.
				</h1>
			</div>
			<div className='flex items-center space-x-2'>
				<button className='bg-gray-700 p-2 rounded-full hover:bg-gray-600'
					onClick={toggleDarkMode}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 5a7 7 0 100 14 7 7 0 000-14z" />
					</svg>
				</button>
				<span>Dark Mode</span>
			</div>
		</nav>
	);
}