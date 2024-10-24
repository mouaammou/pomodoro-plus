import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import UpdateTask from '@/components/updateTask';
import deletePomodoro from '@actions/delete';
import updatePomodoro from '@actions/update';
import { FaTrash } from "react-icons/fa";
import { UpdatePomodoro } from '@types';

interface TaskPomodoroProps {
	handleFocusTask: (taskId: number) => void;
	setCurrentTask: (task: string) => void;
	currentTask: string;
	taskId: number;
	onDelete: (id: number) => void;
	isFocused: boolean;
}

export default function TaskPomodoro({
	handleFocusTask,
	setCurrentTask,
	currentTask,
	taskId,
	onDelete,
	isFocused,
	}: TaskPomodoroProps) {
	const [isCompleted, setIsCompleted] = useState(false);
	const [visible, setVisible] = useState(true);
	const [updateComponent, setUpdateComponent] = useState(false);
	const [taskName, setTaskName] = useState(currentTask);

	const handleCheckboxChange = async () => {
		const newCompletedStatus = !isCompleted;
		setIsCompleted(newCompletedStatus);

		const updateData: UpdatePomodoro = { completed: newCompletedStatus };
		const response = await updatePomodoro(taskId, updateData);

		if (response.error) {
			console.error("Failed to update the task");
			setIsCompleted(!newCompletedStatus);
		}
	};

	const handleDelete = async (taskId: number) => {
		setVisible(false);
		const response = await deletePomodoro(taskId);

		if (!response.error) {
			setCurrentTask('');
			onDelete(taskId);
		} else {
			console.error("Failed to delete the task");
		}
	};

	const handleUpdate = (e: React.MouseEvent) => {
		e.stopPropagation();
		setUpdateComponent(true);
	};

	return (
		updateComponent ? (
			<UpdateTask
			setUpdateComponent={setUpdateComponent}
			setTaskName={setTaskName}
			taskName={taskName}
			taskId={taskId}
			setCurrentTask={setCurrentTask}
			/>
		) : (
			<div
				className={`group relative mb-5 w-full max-w-2xl transform cursor-pointer overflow-hidden rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl
					${visible ? 'opacity-100' : 'hidden opacity-0'}
					${isCompleted 
						? 'bg-gray-100/80 dark:bg-gray-800/50' 
						: isFocused 
						? 'bg-gradient-to-r from-emerald-500/90 to-teal-500/90 shadow-emerald-500/20' 
						: 'bg-white/80 dark:bg-gray-800/80'
					}`}
				onClick={() => {
					handleFocusTask(taskId);
					setCurrentTask(taskName);
				}}
			>
			<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				<div className="relative flex flex-wrap items-center gap-4 p-5">
					{/* Checkbox container */}
					<div className="flex-shrink-0">
						<div className="">
						<input
							type="checkbox"
							checked={isCompleted}
							onChange={handleCheckboxChange}
							onClick={(e) => e.stopPropagation()}
							className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-gray-300 bg-white transition-all checked:border-emerald-500 checked:bg-emerald-500 dark:border-gray-600 dark:bg-gray-700"
						/>
						<svg
							className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
						</svg>
						</div>
					</div>

					{/* Task name */}
					<div className="flex-1 min-w-0">
						<h2 className={`text-xl font-medium tracking-wide transition-all duration-300 break-words
						${isCompleted 
							? 'line-through text-gray-400 dark:text-gray-500' 
							: isFocused
								? 'text-white'
								: 'text-gray-700 dark:text-gray-200'
						}`}>
						{taskName}
						</h2>
					</div>

					{/* Actions container */}
					<div className="flex-shrink-0 flex items-center space-x-3">
						{/* Edit button */}
						<button
						onClick={handleUpdate}
						className={`rounded-lg p-2 transition-colors duration-200
							${isFocused
								? 'hover:bg-white/20 text-white'
								: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
							}`}
						>
						<FiEdit className="h-5 w-5" />
						</button>

						{/* Delete button */}
						<button
						onClick={(e) => {
							e.stopPropagation();
							handleDelete(taskId);
						}}
						className={`rounded-lg p-2 transition-colors duration-200
							${isFocused
								? 'text-white/90 hover:bg-white/20'
								: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20'
							}`}
						>
						<FaTrash className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		)
	);
}