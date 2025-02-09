import { useState, useTransition } from "react";
import create from "@actions/create"; // Ensure the path to `create` is correct.
import { Pomodoro } from "@types";

type SetPomodoros = (tasks: Pomodoro[]) => void;

interface AddTaskProps {
	tasks: Pomodoro[];
	setTasks: SetPomodoros;
}

export default function AddTask({ tasks, setTasks }: AddTaskProps) {
	const [task, setTask] = useState('');
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (task.trim()) {
			startTransition(async () => {
				const response = await create({ task, duration: 25, completed: false }); // Adjust `duration` as needed
				console.log(response);
				if (response.error) {
					setError(response.error);
				} else if (response.data) {
					const newPomodoro = response.data as Pomodoro; // Type assertion
					setTasks([...tasks, newPomodoro]); // Add the new task to the tasks state
					setTask('');
				}
			});
		}
	};

	return (
		<div className="w-full max-w-md px-4">
			<form onSubmit={handleSubmit} className="transform transition-all">
				<div className="overflow-hidden rounded-xl bg-white/90 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-lg dark:bg-gray-800/90">
					<div className="p-6">
					{/* Error Message */}
					{error && (
						<div className="mb-4 animate-shake rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
							<p className="text-sm font-medium text-red-600 dark:text-red-400">
							{error}
							</p>
						</div>
					)}

					{/* Input Group */}
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
							<svg 
							className="h-5 w-5 text-gray-400 dark:text-gray-500" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
							>
							<path 
								strokeLinecap="round" 
								strokeLinejoin="round" 
								strokeWidth={2} 
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
							</svg>
						</div>
						<input
							type="text"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder="What are you working on?"
							disabled={isPending}
							className="block w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-4 pl-12
							text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none 
							focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50
							dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:placeholder:text-gray-500"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isPending}
						className="group mt-4 w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 
							to-purple-500 p-4 text-white shadow-lg transition-all duration-300 
							hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
					>
						<span className="relative flex items-center justify-center gap-2">
							{isPending ? (
							<>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									/>
									<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								<span>Adding Task...</span>
							</>
							) : (
							<>
								<span>Add New Task</span>
								<svg
									className="h-5 w-5 transform transition-transform duration-300"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</>
							)}
						</span>
						<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-300"></div>
					</button>
					</div>
				</div>
			</form>
		</div>
	);
}