import { useState, useTransition } from "react";
import create from "@/actions/pomodoro/create"; // Ensure the path to `create` is correct.
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
		<div>
			<form onSubmit={handleSubmit}>
				<div className="bg-gray-100 p-4 text-black rounded-md shadow-sm dark:bg-gray-800 dark:text-white w-96">
					<div className="space-y-4">
						{error && <p className="text-red-500">{error}</p>}
						<input
							type="text" 
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder="What are you working on?" 
							className="w-full p-2 border rounded-md dark:bg-gray-700"
							disabled={isPending}
						/>
						<button 
							type="submit"
							className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ${isPending && "opacity-50 cursor-not-allowed"}`}
							disabled={isPending}
						>
							{isPending ? "Adding..." : "Add Task"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}