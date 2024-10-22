"use server"

import prisma from "@lib/prisma";
import { PomodoroResponse } from "@types";

async function readPomodoro(id: string): Promise<PomodoroResponse> {
	try {
		const pomodoro = await prisma.pomodoro.findUnique({
				where: { id: parseInt(id) },
		});

		if (!pomodoro) {
				return { data: null, error: "Pomodoro not found" };
		}

		return { data: pomodoro };
	} catch (error) {
		return { data: null, error: "Failed to read pomodoro" };
	}
}

export default readPomodoro;