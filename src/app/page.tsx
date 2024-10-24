"use client";
import Navbar from "@/components/navbar";
import PomodoroApp from "@/components/pomodoroApp";


export default function Home() {
	return (
		<div className="container w-full mx-auto">
			<Navbar />
			<PomodoroApp />
		</div>
	);
}
