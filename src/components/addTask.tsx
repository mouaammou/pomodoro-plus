export default function AddTask() {
	return (
		<div>
			<div className="bg-gray-100 p-4 rounded-md shadow-sm dark:bg-gray-800 dark:text-black w-96">
				<div className="space-y-4">
					<input 
						type="text" 
						placeholder="What are you working on?" 
						className="w-full p-2 border rounded-md"
					/>
					<button 
						className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
					>
						Add Task
					</button>
				</div>
			</div>
		</div>
	);
}