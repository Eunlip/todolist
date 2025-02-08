'use client';

import { getTasks } from '@/actions/task.action';
import { Task } from '@prisma/client';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface TaskContextType {
	tasks: Task[];
	filteredTasks: Task[];
	searchTasks: (query: string) => void;
	refreshTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

	const fetchAndUpdateTasks = async () => {
		const data = await getTasks();
		setTasks(data);
		setFilteredTasks(data);
	};

	useEffect(() => {
		fetchAndUpdateTasks();
	}, []);

	const searchTasks = useCallback(
		(query: string) => {
			if (!query.trim()) {
				setFilteredTasks(tasks);
				return;
			}

			setFilteredTasks(
				tasks.filter((task) => {
					return task.title.toLowerCase().includes(query.toLowerCase());
				}),
			);
		},
		[tasks],
	);

	const contextValue = useMemo(
		() => ({
			tasks,
			filteredTasks,
			searchTasks,
			refreshTasks: fetchAndUpdateTasks,
		}),
		[tasks, filteredTasks, searchTasks],
	);

	return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
}
