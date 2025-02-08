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
import { completedTask } from '@/actions/task.action';
import { ToastProps } from '../TaskCard';
import { useTasksContext } from '@/hooks/useTaskContext';

export default function Complete({
	isDialogOpen,
	setIsDialogOpen,
	taskId,
	toast,
}: AlertDialogProps & { toast: (props: ToastProps) => void } & { taskId: string | null }) {
	const { refreshTasks } = useTasksContext();

	const handleComplete = async () => {
		await completedTask(taskId);
		setIsDialogOpen((prevState) => ({ ...prevState, complete: false }));
		refreshTasks();
		toast({
			variant: 'default',
			description: 'Task updated successfully',
		});
	};

	return (
		<AlertDialog
			open={isDialogOpen.complete}
			onOpenChange={(open) => setIsDialogOpen((prevState) => ({ ...prevState, delete: open }))}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>Are you done with this task?</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => setIsDialogOpen((prevState) => ({ ...prevState, complete: false }))}
					>
						Not yet
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleComplete}>Done</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
