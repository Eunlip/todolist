import { FormTaskProps } from '../Form/addTask';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { AlertDialogProps } from '.';
import EditTask from '../Form/editTask';
import { ToastProps } from '../TaskCard'; 

export default function Edit({
	isDialogOpen,
	setIsDialogOpen,
	title,
	setTitle,
	content,
	setContent,
	toast,
	taskId,
}: FormTaskProps &
	AlertDialogProps & { toast: (props: ToastProps) => void } & { taskId: string | null }) {
	return (
		<Dialog
			open={isDialogOpen.edit}
			onOpenChange={(open) => setIsDialogOpen((prevState) => ({ ...prevState, edit: open }))}
		>
			<DialogContent className='overflow-auto bg-[#DAE6FF]'>
				<DialogHeader>
					<DialogTitle className='text-start'>New Task</DialogTitle>
					<DialogDescription className='text-start text-xs text-muted-foreground'>
						Please fill in the information below to create a new task.
					</DialogDescription>
				</DialogHeader>
				<EditTask
					title={title}
					setTitle={setTitle}
					content={content}
					setContent={setContent}
					toast={toast}
					taskId={taskId}
				/>
			</DialogContent>
		</Dialog>
	);
}
