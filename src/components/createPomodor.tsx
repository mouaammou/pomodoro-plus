// src/app/components/CreatePomodoroForm.tsx
'use client'

import create from "@actions/create";
import { useState } from "react";

export default function CreatePomodoroForm() {
  const [task, setTask] = useState("");
  const [duration, setDuration] = useState(25);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await create({
      task,
      duration,
      completed: false
    });

    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Created:", result.data);
      // Reset form
      setTask("");
      setDuration(25);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task" className="block text-sm font-medium">
          Task
        </label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      
      <div>
        <label htmlFor="duration" className="block text-sm font-medium">
          Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          min="1"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Pomodoro
      </button>
    </form>
  );
}