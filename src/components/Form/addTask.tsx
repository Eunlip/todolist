import { createTask } from '@/actions/task.action';
import RichTextEditor from '../RichTextEditor';
import { DialogClose } from '../ui/dialog';
import { ToastProps } from '../TaskCard';
import { useTasksContext } from '@/hooks/useTaskContext';

export interface FormTaskProps {
	title: string;
	setTitle: (value: string) => void;
	content: string;
	setContent: (value: string) => void;
}

export default function FormAddTask({
	title,
	setTitle,
	content,
	setContent,
	toast,
}: FormTaskProps & { toast: (props: ToastProps) => void }) {
	const { refreshTasks } = useTasksContext();
	async function handleSubmit(formData: FormData) {
		await createTask(formData);
		refreshTasks();
		toast({
			variant: 'default',
			description: 'Task created successfully',
		});
		setTitle('');
		setContent('');
	}

	return (
		<form action={handleSubmit} className='space-y-2'>
			<input
				type='text'
				name='title'
				className='font-medium bg-white p-5 border border-neutral-300 text-xl w-full focus:outline-none'
				placeholder='Type your title Here...'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input type='hidden' name='content' value={content} />
			<RichTextEditor content={content} setContent={setContent} />
			<DialogClose
				className={`w-full ${
					!title || !content
						? 'cursor-not-allowed bg-black/80 hover:bg-black/80'
						: 'bg-black/95 hover:bg-black cursor-pointer'
				}  text-white py-2 rounded`}
				type='submit'
				disabled={!title || !content}
			>
				Add Task
			</DialogClose>
		</form>
	);
}
