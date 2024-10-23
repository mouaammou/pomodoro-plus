import { useState } from 'react';
import TaskPomodoro from './task';

export default function PomodoroApp() {

	return (
		<div>
			<div className="tasks">
				<TaskPomodoro />
			</div>

			<div className="pomodoro_timer">

			</div>
		</div>
	);
}
