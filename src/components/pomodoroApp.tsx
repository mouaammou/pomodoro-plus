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

	// Fetch the list of tasks from the database on component mount
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
			setTasks(tasks.filter(task => task.id !== deleteTaskState)); // Remove task from the state
		}
	}, [deleteTaskState]);

	const handleFocusTask = (taskId: number) => {
		setFocusedTaskId(taskId);
		setCurrentTask(tasks.find(task => task.id === taskId)?.task || '');
	};

	return (
		<div className='flex items-center justify-around space-y-5'>
			<div className="tasks">
				{tasks.map((task) => (
					<TaskPomodoro
						key={task.id} 
						handleFocusTask={() => {
							handleFocusTask(task.id);
						}}
						currentTask={task.task} 
						taskId={task.id} 
						onDelete={(taskId) => setDeleteTaskState(taskId)}
						isFocused={task.id === focusedTaskId}
						setCurrentTask={setCurrentTask}
					/>
				))}

				<AddTask tasks={tasks} setTasks={setTasks} />

			</div>

			<div className="pomodoro_timer">
				<PomodoroTimer currentTask={currentTask}/>
			</div>
		</div>
	);
}