import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer({ currentTask }: { currentTask: string }) {
	const [time, setTime] = useState(1500); // 25 minutes in seconds
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isRunning) {
				intervalRef.current = setInterval(() => {
					setTime((prevTime) => {
						if (prevTime <= 1) {
								clearInterval(intervalRef.current!);
								return 0;
						}
						return prevTime - 1;
					});
				}, 1000);
		} else if (!isRunning && intervalRef.current) {
				clearInterval(intervalRef.current);
		}
		return () => clearInterval(intervalRef.current!);
	}, [isRunning]);

	const handleStart = () => {
		setIsRunning(true);
	};

	const handlePause = () => {
		setIsRunning(false);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTime(1500); // Reset to 25 minutes
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className="flex items-center justify-center">
				<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm text-center space-y-6">
					{/* Timer Config Icon */}
					<div className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
						{currentTask}
					</div>

					{/* Timer Display */}
					<div className="text-6xl font-bold text-gray-800 dark:text-gray-200">
						{formatTime(time)}
					</div>

					{/* Timer Control Buttons */}
					<div className="space-x-4">
						<button
								onClick={handleStart}
								className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
						>
								Start
						</button>
						<button
								onClick={handlePause}
								className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
						>
								Pause
						</button>
						<button
								onClick={handleReset}
								className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition"
						>
								Reset
						</button>
					</div>
				</div>
		</div>
	);
}