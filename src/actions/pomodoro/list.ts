"use server"

import prisma from "@lib/prisma";
import { PomodoroResponse } from "@types";

async function listPomodoros(): Promise<PomodoroResponse> {
	try {
		const pomodoros = await prisma.pomodoro.findMany();

		if (!pomodoros) {
			return { data: null, error: "Failed to list pomodoros" };
		}
		
		return { data: pomodoros };
	} catch (error) {
		console.error(error);
		return { data: null, error: "Failed to list pomodoros" };
	}
}

export default listPomodoros;