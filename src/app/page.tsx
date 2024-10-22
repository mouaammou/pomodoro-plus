"use client";
import CreatePomodoroForm from "@/components/createPomodor";
import PomodoroTester from "@/components/test";


export default function Home() {
	return (
		<div>
			<h1>pomodoro application</h1>
			{/* <CreatePomodoroForm /> */}
			<PomodoroTester />
		</div>
	);
}
