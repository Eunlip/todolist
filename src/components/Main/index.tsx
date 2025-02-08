'use client';

import Image from 'next/image';
import TaskCard from '../TaskCard';
import { useTasksContext } from '@/hooks/useTaskContext';

export default function Main() {
	const { filteredTasks  } = useTasksContext();

	return (
		<main className='px-5 pb-20'>
			<div className='py-5 space-y-5'>
				{filteredTasks .length === 0 ? (
					<div className='flex flex-col justify-center items-center h-[50vh]'>
						<Image
							src='/no-data.svg'
							alt='no data icon'
							width={200}
							height={200}
							draggable={false}
						/>
						<p className='text-[#2A4070] font-semibold text-lg text-center'>
							No tasks found. <br /> Add a new task to get started.
						</p>
					</div>
				) : (
					<>
						<h1 className='font-medium'>Here are your tasks.</h1>
						{filteredTasks .map((task, index) => (
							<div key={task.id}>
								<TaskCard task={task} />
								{index !== filteredTasks .length - 1 && (
									<div className='flex justify-between'>
										<div className='bg-slate-300/80 h-0.5 w-10 rotate-90 mx-[18px] rounded-full' />
										<div className='bg-slate-300/80 h-0.5 w-10 rotate-90 mx-[18px]' />
									</div>
								)}
							</div>
						))}
					</>
				)}
			</div>
		</main>
	);
}
