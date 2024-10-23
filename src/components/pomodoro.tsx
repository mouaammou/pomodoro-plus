import { useState } from 'react';
import TaskPomodoro from './task';
import PomodoroTimer from './timer';

export default function PomodoroApp() {

	const [currentTask, setCurrentTask] = useState('');

	return (
		<div
			className='flex items-center justify-around space-y-5'
		>
			<div className="tasks">
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
				<TaskPomodoro setCurrentTask={setCurrentTask}/>
		
			</div>

			<div className="pomodoro_timer">
				<PomodoroTimer currentTask={currentTask}/>
			</div>
		</div>
	);
}
