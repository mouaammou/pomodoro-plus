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
			setIsCompleted(!newCompletedStatus); // Revert the change if update fails
		}
	};

	const handleDelete = async (taskId: number) => {
		setVisible(false); // Hide the task from the UI before deletion
		const response = await deletePomodoro(taskId);

		if (!response.error) {
			setCurrentTask('');
			onDelete(taskId); // Remove the task from the UI after successful deletion
		} else {
			console.error("Failed to delete the task");
		}
	};

	const handleUpdate = () => {
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
				className={`mb-5 flex items-center justify-between p-4 shadow-md rounded-lg w-96 transition-all duration-500 ease-in-out
				${visible ? '' : 'hidden'}
				${isCompleted ? 'bg-gray-200 dark:bg-gray-700' : isFocused ? 'bg-green-500 dark:bg-blue-700' : 'bg-white dark:bg-gray-800'}`}
				onClick={() => {
					handleFocusTask(taskId);
					setCurrentTask(taskName);
				}}
			>
				<div className="iscompleted flex items-center">
					<input
						type="checkbox"
						className="form-checkbox text-indigo-600 dark:text-indigo-400 h-5 w-5"
						checked={isCompleted}
						onChange={handleCheckboxChange}
					/>
				</div>

				{/* Task name */}
				<div className="taskname flex-1 ml-4">
					<h2 className={`text-xl font-semibold transition-colors duration-300
						${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
						<span className='cursor-pointer'>
								{taskName}
						</span>
					</h2>
				</div>

				{/* Delete Task */}
				<div className="edit_task flex items-center">
					<button
						className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
						onClick={() => {
							handleDelete(taskId);
						}}
					>
						<FaTrash className="w-5 h-5" />
					</button>
				</div>

				{/* Edit Task */}
				<div
					className="edit_task flex items-center"
					onClick={handleUpdate}
				>
					<FiEdit className="h-5 w-5 text-gray-600 dark:text-gray-300 ml-5 cursor-pointer hover:text-gray-400 transition-all ease-linear" />
				</div>
			</div>
		)
	);
}