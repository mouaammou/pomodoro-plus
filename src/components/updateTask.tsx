import { useState } from "react";
import update from "@actions/update"; // Ensure the path to `update` is correct.
import { PomodoroResponse, UpdatePomodoro } from "@types";

interface UpdateTaskProps {
	setUpdateComponent: (value: boolean) => void;
	setTaskName: (value: string) => void;
	taskName: string;
	taskId: number; // Add taskId to props
	setCurrentTask: (task: string) => void;
}

export default function UpdateTask({
	setUpdateComponent,
	setTaskName,
	taskName,
	taskId, // Destructure taskId
	setCurrentTask,
}: UpdateTaskProps) {
	const [localTaskName, setLocalTaskName] = useState(taskName);
	const [error, setError] = useState<string | null>(null);

	const handleSave = async () => {
		const data: UpdatePomodoro = { task: localTaskName };
		const response: PomodoroResponse = await update(taskId, data);

		if (response.error) {
			setError(response.error);
		} else if (response.data) {
			setTaskName(localTaskName);
			setUpdateComponent(false);
		}
	};

	const handleCancel = () => {
		setUpdateComponent(false);
	};

	return (
		<div className="flex items-center justify-center my-4 w-96">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
				{/* Task Name Input */}
				<div>
					<input
						type="text"
						id="taskName"
						className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 text-black"
						placeholder="Enter task name"
						value={localTaskName}
						onChange={(e) => {
							setLocalTaskName(e.target.value);
							setCurrentTask(e.target.value); // Update the task name in the parent component
							setError(null); // Clear error message on input change
						}}
					/>
				</div>

				{/* Error Message */}
				{error && <p className="text-red-500">{error}</p>}

				{/* Update Button */}
				<div className="flex space-x-4">
					<button
						onClick={handleSave}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
					>
						Save
					</button>
					<button
						onClick={handleCancel}
						className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}