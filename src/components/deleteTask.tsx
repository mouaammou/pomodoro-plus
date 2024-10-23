import { FaTrash } from 'react-icons/fa';

export default function DeleteTask({ taskId }: { taskId: string }) {
	const handleDelete = () => {
		//  onDelete(taskId);
	};

	return (
		<div className="flex items-center justify-between">
			{/* Delete Button with Icon */}
			<button 
			className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
			onClick={handleDelete}
			>
			<FaTrash className="w-5 h-5" />
			</button>
		</div>
	);
}
