"use server"

import prisma from "@lib/prisma";
import { PomodoroResponse } from "@types";

async function deletePomodoro(id: string): Promise<PomodoroResponse> {
	try {
		const deletedPomodoro = await prisma.pomodoro.delete({
				where: { id: parseInt(id) },
		});

		if (!deletedPomodoro) {
			return { data: null, error: "Failed to delete pomodoro" };
		}

		return { data: deletedPomodoro };
	} catch (error) {
		return { data: null, error: "Failed to delete pomodoro" };
	}
}

export default deletePomodoro;