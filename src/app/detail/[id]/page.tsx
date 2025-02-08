import { auth } from '@/lib/auth';
import { getSingleTask } from '@/actions/task.action';
import DetailTaskClient from './DetailTaskClient';

export default async function DetailTask({params}: {params: Promise<{ id: string }>}) {
	const { id } = await params;
	const session = await auth();
	const task = await getSingleTask(id);

	if (!task) return null;

	return <DetailTaskClient task={task} session={session} />;
}
