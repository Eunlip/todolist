import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertDialogProps } from '.';
import { deleteTask } from '@/actions/task.action';
import { ToastProps } from '../TaskCard';
import { useTasksContext } from '@/hooks/useTaskContext';

export default function Delete({
	isDialogOpen,
	setIsDialogOpen,
	taskId,
	toast,
}: AlertDialogProps & { toast: (props: ToastProps) => void } & { taskId: string | null }) {
	const { refreshTasks } = useTasksContext();

	async function handleDelete() {
		await deleteTask(taskId);
		setIsDialogOpen((prevState) => ({ ...prevState, delete: false }));
		refreshTasks();
		toast({
			variant: 'default',
			description: 'Task deleted successfully',
		});
	}

	return (
		<AlertDialog
			open={isDialogOpen.delete}
			onOpenChange={(open) => setIsDialogOpen((prevState) => ({ ...prevState, delete: open }))}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>Delete this task?</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
