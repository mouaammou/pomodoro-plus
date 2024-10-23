import { useState } from 'react';
import DeleteTask from './deleteTask';
import { FiEdit } from 'react-icons/fi';
import UpdateTask from "@/components/updateTask";

export default function TaskPomodoro(
	{setCurrentTask}: {setCurrentTask: (value: string) => void}
) {
	const [isCompleted, setIsCompleted] = useState(false);
	const [visible, setVisible] = useState(true);
	const [updateComponent, setUpdateComponent] = useState(false);
	const [taskName, setTaskName] = useState('task name');

	const handleCheckboxChange = () => {
		setIsCompleted(!isCompleted);
	};

	const handleDelete = () => {
		// Start the hide animation
		setVisible(false);
	};

	const handleUpdate = () => {
		// dispay the updateComponent
		setUpdateComponent(true);

	};

	return (

		updateComponent ? <UpdateTask setUpdateComponent={setUpdateComponent} setTaskName={setTaskName} taskName={taskName} /> :
			<div 
				className={`mb-5 flex items-center justify-between p-4 shadow-md rounded-lg w-96 transition-all duration-500 ease-in-out
				${visible ? '' : 'hidden'}
				${isCompleted ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
			>
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
					<h2 className={`text-xl font-semibold transition-colors duration-300
						${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
						<span className='cursor-pointer'
							onClick={() => setCurrentTask(taskName)}
						>{taskName}</span>
					</h2>
				</div>

				{/* delete task */}
				<div className="edit_task flex items-center" onClick={handleDelete} >
					<DeleteTask taskId="1" />
				</div>
				
				{/* Edit Task */}
				<div
					className="edit_task flex items-center"
					onClick={handleUpdate}
				>
					<FiEdit className="h-5 w-5 text-gray-600 dark:text-gray-300 ml-5 cursor-pointer hover:text-gray-400 transition-all ease-linear"/>
				</div>
			</div>
	);
}
