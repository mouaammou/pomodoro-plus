"use client";
import PomodoroTester from "@/components/test";
import DarkModeToggle from "@/components/darkmode";
import PomodoroApp from "@/components/pomodoro";
import Navbar from "@/components/navbar";
import AddTask from "@/components/addTask";
import Timer from "@/components/timer";
import UpdateTask from "@/components/updateTask";
import DeleteTask from "@/components/deleteTask";


export default function Home() {
	return (
		<div>
			<Navbar />
			<PomodoroApp />
			<br />
			<br />
			<AddTask />
			<br />
			<br />
			<UpdateTask />
			<br />
			<br />
			<Timer />
			<br />
			<br />
			<PomodoroTester />
			<div></div>
		</div>

	);
}
