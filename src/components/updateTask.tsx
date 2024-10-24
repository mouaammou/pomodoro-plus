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
		<div className="flex min-h-[200px] items-center justify-center p-4">
  <div className="w-full max-w-md transform rounded-xl bg-white/90 p-6 shadow-2xl transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:shadow-gray-900/30">
    {/* Task Name Input */}
    <div className="relative mb-6">
      <label
        htmlFor="taskName"
        className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        Task Name
      </label>
      <input
        type="text"
        id="taskName"
        className="peer w-full rounded-lg border-2 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 
          transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 
          dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-200 dark:placeholder-gray-500"
        placeholder="What needs to be done?"
        value={localTaskName}
        onChange={(e) => {
          setLocalTaskName(e.target.value);
          setCurrentTask(e.target.value);
          setError(null);
        }}
      />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 peer-focus:w-full"></div>
    </div>

    {/* Error Message with animation */}
    {error && (
      <div className="mb-4 animate-shake rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    )}

    {/* Buttons */}
    <div className="flex space-x-3">
      <button
        onClick={handleSave}
        className="group relative flex-1 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-white shadow-lg 
          transition-all duration-300 hover:shadow-xl hover:from-indigo-600 hover:to-purple-600"
      >
        <span className="relative z-10 font-medium">Save Changes</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-300 group-hover:translate-x-full"></div>
      </button>

      <button
        onClick={handleCancel}
        className="group flex-1 rounded-lg border-2 border-gray-200 bg-transparent px-6 py-3 font-medium text-gray-700 
          transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
	);
}