import { useEffect, useState } from 'react';
import TaskPomodoro from './task';
import PomodoroTimer from './timer';
import AddTask from './addTask';
import listPomodoros from '@/actions/pomodoro/list';
import { Pomodoro } from '@types';

export default function PomodoroApp() {
	const [currentTask, setCurrentTask] = useState('');
	const [tasks, setTasks] = useState<Pomodoro[]>([]);
	const [focusedTaskId, setFocusedTaskId] = useState<number | null>(null);
	const [deleteTaskState, setDeleteTaskState] = useState<number | null>(null);

	useEffect(() => {
		async function fetchTasks() {
			const response = await listPomodoros();
			if (response.data) {
			setTasks(response.data as Pomodoro[]);
			}
		}
		fetchTasks();
	}, []);

	useEffect(() => {
		if (deleteTaskState !== null) {
			setTasks(tasks.filter(task => task.id !== deleteTaskState));
		}
	}, [deleteTaskState]);

	const handleFocusTask = (taskId: number) => {
		setFocusedTaskId(taskId);
		setCurrentTask(tasks.find(task => task.id === taskId)?.task || '');
	};

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
				{/* Tasks Panel */}
				<div className="w-full lg:w-1/3 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
					<div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
					<h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
						Task List
					</h2>
					
					{tasks.map((task) => (
						<TaskPomodoro
							key={task.id}
							handleFocusTask={() => handleFocusTask(task.id)}
							currentTask={task.task}
							taskId={task.id}
							onDelete={(taskId) => setDeleteTaskState(taskId)}
							isFocused={task.id === focusedTaskId}
							setCurrentTask={setCurrentTask}
						/>
					))}

					<div className="mt-6 pt-6 border-t border-white/10">
						<AddTask tasks={tasks} setTasks={setTasks} />
					</div>
					</div>
				</div>

				{/* Timer Panel */}
				<div className="w-full lg:w-2/3">
					<PomodoroTimer currentTask={currentTask} />
				</div>
			</div>
			</div>

			{/* Background Decoration */}
			<div className="fixed inset-0 -z-10 overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/30 rounded-full filter blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/25 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
			</div>
			</div>

			<style jsx>{`
			.custom-scrollbar {
				scrollbar-width: thin;
				scrollbar-color: rgba(52, 211, 153, 0.3) rgba(255, 255, 255, 0.1);
			}

			.custom-scrollbar::-webkit-scrollbar {
				width: 6px;
				height: 6px;
			}

			.custom-scrollbar::-webkit-scrollbar-track {
				background: rgba(255, 255, 255, 0.1);
				border-radius: 8px;
				margin: 4px;
			}

			.custom-scrollbar::-webkit-scrollbar-thumb {
				background: rgba(52, 211, 153, 0.3);
				border-radius: 8px;
				border: 2px solid transparent;
				background-clip: padding-box;
				transition: all 0.3s ease;
			}

			.custom-scrollbar::-webkit-scrollbar-thumb:hover {
				background: rgba(52, 211, 153, 0.5);
				border: 2px solid transparent;
				background-clip: padding-box;
			}

			.custom-scrollbar::-webkit-scrollbar-corner {
				background: transparent;
			}

			/* For Firefox */
			@supports (scrollbar-color: auto) {
				.custom-scrollbar {
					scrollbar-width: thin;
					scrollbar-color: rgba(52, 211, 153, 0.3) rgba(255, 255, 255, 0.1);
				}
			}

			@keyframes pulse {
				0%, 100% { 
					opacity: 0.4; 
					transform: scale(1); 
				}
				50% { 
					opacity: 0.6; 
					transform: scale(1.05); 
				}
			}

			.animate-pulse {
				animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
			}
			`}</style>
		</div>
	);
}