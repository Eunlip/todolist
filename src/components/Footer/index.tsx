'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import FormAddTask from '../Form/addTask';
import { useToast } from '@/hooks/use-toast';

export default function CreateTask() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { toast } = useToast()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='fixed z-20 bottom-5 right-5 bg-white rounded-full p-3 shadow-md cursor-pointer hover:bottom-7 transition-all duration-300'>
					<Plus className='w-8 h-8' />
				</div>
			</DialogTrigger>
			<DialogContent className='overflow-auto bg-[#DAE6FF]'>
				<DialogHeader>
					<DialogTitle className='text-start'>New Task</DialogTitle>
					<DialogDescription className='text-start text-xs text-muted-foreground'>
						Please fill in the information below to create a new task.
					</DialogDescription>
				</DialogHeader>
				<FormAddTask title={title} setTitle={setTitle} content={content} setContent={setContent} toast={toast}/>
			</DialogContent>
		</Dialog>
	);
}
