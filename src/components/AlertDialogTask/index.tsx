import React from 'react';
import Complete from './complete';
import Delete from './delete';
import Edit from './edit';
import { FormTaskProps } from '../Form/addTask';
import { ToastProps } from '../TaskCard'; 

export interface DialogState {
	complete: boolean;
	delete: boolean;
	edit: boolean;
}

export interface AlertDialogProps {
	isDialogOpen: DialogState;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<DialogState>>;
}

export default function AlertDialogTask({
	isDialogOpen,
	setIsDialogOpen,
	title,
	setTitle,
	content,
	setContent,
	toast,
	taskId,
}: FormTaskProps & AlertDialogProps & { toast: (props: ToastProps) => void } & { taskId: string | null }) {
	return (
		<>
			<Complete isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} taskId={taskId} toast={toast}/>
			<Delete isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} taskId={taskId} toast={toast}/>
			<Edit
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				title={title}
				setTitle={setTitle}
				content={content}
				setContent={setContent}
				toast={toast}
				taskId={taskId}
			/>
		</>
	);
}
