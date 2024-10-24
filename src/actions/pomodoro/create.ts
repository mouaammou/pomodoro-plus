"use server"

import prisma from "@lib/prisma";
import { CreatePomodoro, PomodoroResponse } from "@types";


async function create(data: CreatePomodoro): Promise<PomodoroResponse> {
	try {
		const newPomodoro = await prisma.pomodoro.create({
			data: {
				task: data.task,
				duration: data.duration,
				completed: data.completed || false,
			},
		});

		if (!newPomodoro) {
			return { data: null, error: "Failed to create pomodoro" };
		}

		return { data : newPomodoro};
	} catch (error) {
		return { data: null, error: "Failed to create pomodoro" };
	}
}

export default create;
