import { TaskContext } from '@/context/TaskContext';
import { useContext } from 'react';

export function useTasksContext() {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTasksContext must be used within a TaskContextProvider');
	}
	return context;
}
