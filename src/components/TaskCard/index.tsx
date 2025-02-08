'use client';

import { getTasks } from '@/actions/task.action';
import { formatDistanceToNow } from 'date-fns';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import Link from 'next/link';
import { useState } from 'react';
import AlertDialogTask, { DialogState } from '../AlertDialogTask';
import { useToast } from '@/hooks/use-toast';

export type Task = Awaited<ReturnType<typeof getTasks>>[0];

export interface ToastProps {
	title?: string;
	description: string;
	variant?: 'default' | 'destructive';
}

export default function TaskCard({ task }: { task: Task }) {
	const [isDialogOpen, setIsDialogOpen] = useState<DialogState>({
		complete: false,
		delete: false,
		edit: false,
	});
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { toast } = useToast();

	return (
		<>
			<div className='relative z-10 bg-white shadow rounded-full px-5 py-4'>
				<div
					className={`px-3 py-1 absolute ${
						task.status === 'PENDING'
							? 'bg-red-500 shadow-red-200'
							: 'bg-green-500 shadow-green-200'
					}  text-white text-xs rounded-full -top-2 right-7 shadow-md `}
				>
					{task.status.toLocaleLowerCase()}
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex space-x-3'>
						<Image
							src={`${task.status === 'PENDING' ? '/icon-pending.svg' : '/icon-completed.svg'}`}
							alt='icon completed'
							width={35}
							height={35}
						/>
						<div className='flex flex-col w-[calc(80%)]'>
							<p className='text-xs text-[#707070]'>
								{task.updatedAt && new Date(task.updatedAt) > new Date(task.createdAt)
									? `Updated ${formatDistanceToNow(task.updatedAt)} ago`
									: `Created ${formatDistanceToNow(new Date(task.createdAt))} ago`}
							</p>
							<h1
								className={`${task.status === 'COMPLETED' && 'line-through'} text-lg font-medium`}
							>
								{task.title}
							</h1>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='mx-3 mt-2 outline-none visited:outline-none focus:outline-none'>
								<EllipsisVertical className='text-[#999]' />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='mr-16'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{task.status === 'PENDING' && (
								<>
									<DropdownMenuItem
										onSelect={() => {
											setSelectedTaskId(task.id);
											setIsDialogOpen((prevState) => ({ ...prevState, complete: true }));
										}}
									>
										Complete
									</DropdownMenuItem>
									<DropdownMenuItem
										onSelect={() => {
											setSelectedTaskId(task.id);
											setTitle(task?.title ?? '');
											setContent(task?.content ?? '');
											setIsDialogOpen((prevState) => ({ ...prevState, edit: true }));
										}}
									>
										Edit
									</DropdownMenuItem>
								</>
							)}
							<DropdownMenuItem
								onSelect={() => {
									setSelectedTaskId(task.id);
									setIsDialogOpen((prevState) => ({ ...prevState, delete: true }));
								}}
							>
								Delete
							</DropdownMenuItem>
							<Link href={`/detail/${task.id}`}>
								<DropdownMenuItem>Detail</DropdownMenuItem>
							</Link>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<AlertDialogTask
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				title={title}
				setTitle={setTitle}
				content={content}
				setContent={setContent}
				toast={toast}
				taskId={selectedTaskId}
			/>
		</>
	);
}
