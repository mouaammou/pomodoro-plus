"use server"

import prisma from "@lib/prisma";
import { PomodoroResponse, UpdatePomodoro } from "@types";

async function update(id: number, data: UpdatePomodoro): Promise<PomodoroResponse> {
	try {
		const updatedPomodoro = await prisma.pomodoro.update({
				where: { id },
				data,
		});
		
		if (!updatedPomodoro) {
				return { data: null, error: "Failed to update pomodoro" };
		}

		return { data: updatedPomodoro };
	} catch (error) {
		console.error(error);
		return { data: null, error: "Failed to update pomodoro" };
	}
}

export default update;