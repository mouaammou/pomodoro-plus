import React, { useState } from 'react';
import create from '@/actions/pomodoro/create';
import deletePomodoro from '@/actions/pomodoro/delete';
import update from '@/actions/pomodoro/update';
import readPomodoro from '@/actions/pomodoro/read';
import listPomodoros from '@/actions/pomodoro/list';

import { CreatePomodoro, UpdatePomodoro, PomodoroResponse } from '@types';

const PomodoroTester = () => {
		const [task, setTask] = useState('');
		const [duration, setDuration] = useState(0);
		const [completed, setCompleted] = useState(false);
		const [id, setId] = useState('');
		const [updateData, setUpdateData] = useState<Partial<UpdatePomodoro>>({});
		const [result, setResult] = useState<PomodoroResponse | null>(null);

		const handleCreate = async () => {
			const data: CreatePomodoro = { task, duration, completed };
			const response = await create(data);
			setResult(response);
		};

		const handleDelete = async () => {
			const response = await deletePomodoro(id);
			setResult(response);
		};

		const handleUpdate = async () => {
			const response = await update(id, updateData);
			setResult(response);
		};

		const handleRead = async () => {
			const response = await readPomodoro(id);
			setResult(response);
		};

		const handleList = async () => {
			const response = await listPomodoros();
			setResult(response);
		};

		return (
			<div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
			<h1 className="text-2xl font-bold text-center text-gray-800">Pomodoro Tester</h1>
			
			{/* Create Pomodoro Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Create Pomodoro</h2>
				<div className="space-y-4">
					<input 
					type="text" 
					placeholder="Task" 
					value={task} 
					onChange={(e) => setTask(e.target.value)} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<input 
					type="number" 
					placeholder="Duration (minutes)" 
					value={duration} 
					onChange={(e) => setDuration(Number(e.target.value))} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<label className="inline-flex items-center space-x-2">
					<span>Completed:</span>
					<input 
						type="checkbox" 
						checked={completed} 
						onChange={(e) => setCompleted(e.target.checked)} 
						className="form-checkbox text-indigo-600"
					/>
					</label>
					<button 
					onClick={handleCreate} 
					className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
					>
					Create
					</button>
				</div>
			</div>
			
			{/* Delete Pomodoro Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Delete Pomodoro</h2>
				<div className="space-y-4">
					<input 
					type="text" 
					placeholder="ID" 
					value={id} 
					onChange={(e) => setId(e.target.value)} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<button 
					onClick={handleDelete} 
					className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
					>
					Delete
					</button>
				</div>
			</div>
			
			{/* Update Pomodoro Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Update Pomodoro</h2>
				<div className="space-y-4">
					<input 
					type="text" 
					placeholder="ID" 
					value={id} 
					onChange={(e) => setId(e.target.value)} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<input 
					type="text" 
					placeholder="Task" 
					onChange={(e) => setUpdateData({ ...updateData, task: e.target.value })} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<input 
					type="number" 
					placeholder="Duration" 
					onChange={(e) => setUpdateData({ ...updateData, duration: Number(e.target.value) })} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<label className="inline-flex items-center space-x-2">
					<span>Completed:</span>
					<input 
						type="checkbox" 
						onChange={(e) => setUpdateData({ ...updateData, completed: e.target.checked })} 
						className="form-checkbox text-indigo-600"
					/>
					</label>
					<button 
					onClick={handleUpdate} 
					className="w-full p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
					>
					Update
					</button>
				</div>
			</div>
			
			{/* Read Pomodoro Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Read Pomodoro</h2>
				<div className="space-y-4">
					<input 
					type="text" 
					placeholder="ID" 
					value={id} 
					onChange={(e) => setId(e.target.value)} 
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
					/>
					<button 
					onClick={handleRead} 
					className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
					>
					Read
					</button>
				</div>
			</div>
			
			{/* List Pomodoros Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">List Pomodoros</h2>
				<button 
					onClick={handleList} 
					className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
				>
					List Pomodoros
				</button>
			</div>

			{/* Result Section */}
			<div className="bg-gray-100 p-4 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">Result</h2>
				<pre className="bg-gray-200 p-4 rounded-md overflow-auto">
					{JSON.stringify(result, null, 2)}
				</pre>
			</div>
			</div>
	);
};

export default PomodoroTester;