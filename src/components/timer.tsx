import { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // React Icon for config

export default function PomodoroTimer() {
	const [time, setTime] = useState('25:00'); // Placeholder for timer value

	return (
		<div className="flex items-center justify-center">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm text-center space-y-6">
				{/* Timer Config Icon */}
				<div className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
					task name
				</div>

				{/* Timer Display */}
				<div className="text-6xl font-bold text-gray-800 dark:text-gray-200">
					{time}
				</div>

				{/* Timer Control Buttons */}
				<div className="space-x-4">
					<button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition">
						Start
					</button>
					<button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition">
						Pause
					</button>
					<button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition">
						Reset
					</button>
				</div>
			</div>
		</div>				
	);
}
