import { useState } from 'react';
import DeleteTask from './deleteTask';
import { FiEdit } from 'react-icons/fi';

export default function TaskPomodoro() {
	const [isCompleted, setIsCompleted] = useState(false);

	const handleCheckboxChange = () => {
		setIsCompleted(!isCompleted);
	};

	return (
		<div className={`flex items-center justify-between p-4 shadow-md rounded-lg w-96 transition-colors duration-300 ${isCompleted ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
			{/* Task Completion Checkbox */}
			<div className="iscompleted flex items-center">
					<input 
						type="checkbox" 
						className="form-checkbox text-indigo-600 dark:text-indigo-400 h-5 w-5"
						checked={isCompleted}
						onChange={handleCheckboxChange}
					/>
			</div>

			{/* Task Name */}
			<div className="taskname flex-1 ml-4">
					<h2 className={`text-xl font-semibold transition-colors duration-300 ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
						Task Name
					</h2>
			</div>

			{/* Edit Task - Three Dots */}
			<div className="edit_task flex items-center">
				<DeleteTask taskId="1" />
				{/* edit taks, icon */}
				<FiEdit className="h-5 w-5 text-gray-600 dark:text-gray-300 ml-5 cursor-pointer hover:text-gray-400 transition-all ease-linear" />
			</div>
		</div>
	);
}