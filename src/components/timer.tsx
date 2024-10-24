import { useState, useEffect, useRef } from 'react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export default function PomodoroTimer({ currentTask }: { currentTask: string }) {
	const [time, setTime] = useState(1500);
	const [isRunning, setIsRunning] = useState(false);
	const [mode, setMode] = useState<TimerMode>('focus');
	const [sessions, setSessions] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const TIMES = {
		focus: 1500,
		shortBreak: 300,
		longBreak: 900,
	};

	const TOTAL_TIME = TIMES[mode];
	const progress = ((TOTAL_TIME - time) / TOTAL_TIME) * 100;
	const circumference = 2 * Math.PI * 120;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(intervalRef.current!);
					handleTimerComplete();
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

	const handleTimerComplete = () => {
		setIsRunning(false);
		if (mode === 'focus') {
			const newSessions = sessions + 1;
			setSessions(newSessions);
			if (newSessions % 4 === 0) {
			setMode('longBreak');
			setTime(TIMES.longBreak);
			} else {
			setMode('shortBreak');
			setTime(TIMES.shortBreak);
			}
		} else {
			setMode('focus');
			setTime(TIMES.focus);
		}
	};

	const handleStart = () => setIsRunning(true);
	const handlePause = () => setIsRunning(false);
	const handleReset = () => {
		setIsRunning(false);
		setTime(TIMES[mode]);
	};

	const handleModeChange = (newMode: TimerMode) => {
		setIsRunning(false);
		setMode(newMode);
		setTime(TIMES[newMode]);
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	const getModeColor = () => {
		switch (mode) {
			case 'focus': return 'from-violet-500 to-purple-500';
			case 'shortBreak': return 'from-emerald-500 to-teal-500';
			case 'longBreak': return 'from-blue-500 to-indigo-500';
		}
	};

	return (
		<div className=" flex items-center justify-center p-4">
			<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 w-full max-w-xl shadow-2xl border border-white/20">
			<div className="flex justify-center gap-4 mb-8">
				{(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((timerMode) => (
					<button
					key={timerMode}
					onClick={() => handleModeChange(timerMode)}
					className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
						${mode === timerMode 
							? 'bg-white/20 text-white' 
							: 'text-white/60 hover:text-white hover:bg-white/10'}`}
					>
					{timerMode === 'focus' ? 'Focus' : timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
					</button>
				))}
			</div>
				<div className="flex items-center justify-center bg-gray-800/50 rounded-lg p-4 shadow-md mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
				</svg>
				<div className="text-center">
					<span className="text-gray-400 text-lg">Sessions completed: </span>
					<span className="text-white font-extrabold text-2xl ml-2">{sessions}</span>
				</div>
				</div>


			<div className="bg-white/5 rounded-2xl p-4 mb-12 text-center">
				<h2 className={`text-2xl font-bold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent`}>
					{currentTask}
				</h2>
			</div>

			<div className="relative w-80 h-80 mx-auto mb-12">
				<svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
					{/* Gradient Definitions */}
					<defs>
					<linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" className="animate-gradient-shift">
							<animate
							attributeName="stop-color"
							values={`${mode === 'focus' ? '#8B5CF6;#A78BFA;#8B5CF6' : 
										mode === 'shortBreak' ? '#10B981;#14B8A6;#10B981' : 
										'#6366F1;#818CF8;#6366F1'}`}
							dur="3s"
							repeatCount="indefinite"
							/>
						</stop>
						<stop offset="100%" className="animate-gradient-shift">
							<animate
							attributeName="stop-color"
							values={`${mode === 'focus' ? '#A78BFA;#8B5CF6;#A78BFA' : 
										mode === 'shortBreak' ? '#14B8A6;#10B981;#14B8A6' : 
										'#818CF8;#6366F1;#818CF8'}`}
							dur="3s"
							repeatCount="indefinite"
							/>
						</stop>
					</linearGradient>
					</defs>

					{/* Background Circle */}
					<circle
					cx="128"
					cy="128"
					r="120"
					fill="none"
					strokeWidth="8"
					className="stroke-white/10"
					/>

					{/* Animated Progress Circle */}
					<circle
					cx="128"
					cy="128"
					r="120"
					fill="none"
					strokeWidth="8"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					stroke="url(#timerGradient)"
					className="transition-all duration-1000"
					style={{
						filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))',
					}}
					>
					<animate
						attributeName="stroke-dashoffset"
						from={circumference}
						to={strokeDashoffset}
						dur="1s"
						fill="freeze"
					/>
					</circle>

					{/* Glowing Dots */}
					<circle
					cx="128"
					cy="8"
					r="4"
					fill="white"
					className="animate-pulse"
					style={{
						filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
					}}
					/>
				</svg>

				{/* Timer Display */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
					<div className="text-6xl font-bold text-white mb-2 tracking-tight animate-pulse">
						{formatTime(time)}
					</div>
					<div className="text-white/60 font-medium">
						{mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
					</div>
					</div>
				</div>

				{/* Glowing Background Effect */}
				<div className="absolute inset-0 -z-10">
					<div className={`absolute inset-0 bg-gradient-to-r ${getModeColor()} opacity-20 blur-3xl`} />
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<button
					onClick={handleStart}
					disabled={isRunning}
					className={`group relative px-6 py-3 rounded-xl bg-gradient-to-r ${getModeColor()}
					text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 
					hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
					hover:scale-105 active:scale-95`}
				>
					<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 
					transition-opacity"></span>
					Start
				</button>

				<button
					onClick={handlePause}
					disabled={!isRunning}
					className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
					text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 
					hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
					hover:scale-105 active:scale-95"
				>
					<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 
					transition-opacity"></span>
					Pause
				</button>

				<button
					onClick={handleReset}
					className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 
					text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 
					hover:-translate-y-0.5 hover:scale-105 active:scale-95"
				>
					<span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 
					transition-opacity"></span>
					Reset
				</button>
			</div>
			</div>
		</div>
	);
}