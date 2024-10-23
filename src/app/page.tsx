"use client";
import PomodoroTester from "@/components/test";
import Navbar from "@/components/navbar";
import AddTask from "@/components/addTask";
import Timer from "@/components/timer";
import UpdateTask from "@/components/updateTask";
import DeleteTask from "@/components/deleteTask";
import PomodoroApp from "@/components/pomodoro";


export default function Home() {
	return (
		<div className="container w-full mx-auto">
			<Navbar />
			<PomodoroApp />
		</div>
	);
}
