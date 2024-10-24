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
	}, [isRunning, currentTask]);

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
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
	<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-all">
		{/* Task Name with styled container */}
		<div className="bg-white/5 rounded-xl p-4 mb-8">
			<h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
			{currentTask}
			</h2>
		</div>

		{/* Timer Display with glowing effect */}
		<div className="relative mb-12">
			<div className="text-7xl font-extrabold text-white tracking-tight text-center animate-pulse">
			{formatTime(time)}
			</div>
			<div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-3xl -z-10"></div>
		</div>

		{/* Control Buttons with improved styling */}
		<div className="grid grid-cols-3 gap-4">
			<button
			onClick={handleStart}
			className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
			>
			<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
			Start
			</button>

			<button
			onClick={handlePause}
			className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
			>
			<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
			Pause
			</button>

			<button
			onClick={handleReset}
			className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
			>
			<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
			Reset
			</button>
		</div>
	</div>
	</div>
	);

}