'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
	try {
		return await prisma.task.findMany({
			orderBy: {
				status: 'asc',
			},
		});
	} catch (error) {
		console.error('Error in getTasks', error);
		throw new Error('Failed to fetch tasks');
	}
}

export async function getSingleTask(taskId: string) {
	try {
		return await prisma.task.findUnique({
			where: { id: taskId },
		});
	} catch (error) {
		console.error('Task not found:', error);
		throw new Error('Task not found');
	}
}

export async function createTask(formData: FormData) {
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;

	if (!title || !content) {
		return { success: false, message: 'Title and content are required' };
	}

	try {
		const session = await auth();
		if (!session?.user) return null;

		const newTask = await prisma.task.create({
			data: {
				title,
				content,
				status: 'PENDING',
				User: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});

		revalidatePath('/');
		return { success: true, message: 'Task created successfully', newTask };
	} catch (error) {
		console.error('Error creating task:', error);
		return { success: false, message: 'Failed to create task' };
	}
}

export async function editTask(formData: FormData) {
	const taskId = formData.get('id') as string | null;
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;

	if (!taskId) {
		return { success: false, message: 'Task not found' };
	}

	if (!title || !content) {
		return { success: false, message: 'Title and content are required' };
	}

	try {
		const updateTask = await prisma.task.update({
			where: { id: taskId },
			data: {
				title,
				content,
			},
		});

		revalidatePath('/');
		return { success: true, message: 'Task created successfully', updateTask };
	} catch (error) {
		console.error('Error editing task:', error);
		return { success: false, message: 'Failed to edit task' };
	}
}

export async function completedTask(taskId: string | null) {
	if (!taskId) {
		throw new Error('Task not found');
	}

	try {
		revalidatePath('/');
		return await prisma.task.update({
			where: { id: taskId },
			data: {
				status: 'COMPLETED',
			},
		});
	} catch (error) {
		console.error('Error updating task:', error);
		throw new Error('Failed to update task');
	}
}

export async function deleteTask(taskId: string | null) {
	if (!taskId) {
		throw new Error('Task not found');
	}

	try {
		revalidatePath('/');
		return await prisma.task.delete({
			where: { id: taskId },
		})
	} catch (error) {
		console.error('Error while deleting:', error);
		throw new Error('Failed to delete task');
	}
}
