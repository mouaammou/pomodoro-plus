export interface Pomodoro {
	id: number
	task: string
	duration: number
	completed: boolean
	createdAt: Date
}

export interface PomodoroResponse {
	data: Pomodoro | Pomodoro[] | null;
	error?: string;
}

export type CreatePomodoro = Omit<Pomodoro, 'id' | 'createdAt'>;
export type UpdatePomodoro = Partial<Pick<Pomodoro, 'task' | 'duration' | 'completed'>>;