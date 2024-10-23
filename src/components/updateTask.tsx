import { useState } from 'react';

export default function UpdateTask() {
	const [taskName, setTaskName] = useState('');
	const [isCompleted, setIsCompleted] = useState(false);

	const handleUpdate = () => {
		// Function to handle the update operation (API call or state update)
		console.log({
			taskName,
			isCompleted,
		});
	};

	return (
		<div className="flex items-center justify-center">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
			{/* Task Name Input */}
			<div>
				<input
					type="text"
					id="taskName"
					className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 text-black"
					placeholder="Enter task name"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>
			</div>

			{/* Update Button */}
			<div className="flex space-x-4">
				<button
				// onClick={handleSave}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
				>
					Save
				</button>
				<button
					// onClick={onCancel}
					className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
				>
					Cancel
				</button>
			</div>
			</div>
		</div>
	);
}
