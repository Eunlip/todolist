'use client';

import { logout } from '@/actions/auth.actions';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useTasksContext } from '@/hooks/useTaskContext';
import { Session } from '@auth/core/types';
import Image from 'next/image';
import SearchTask from '../SearchTask';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
	session: Session;
}
export default function Header({ session }: HeaderProps) {
	const { tasks } = useTasksContext();

	const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length;
	const completedTasks = tasks.filter((task) => task.status === 'COMPLETED').length;

	return (
		<header className='bg-[#2A4070] p-5 space-y-8 rounded-b-[40px]'>
			<div className='flex items-center justify-between w-full'>
				<Image src='/Brand.png' alt='Brand Icon' width={110} height={110} draggable={false} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className='cursor-pointer'>
							<AvatarImage src={session?.user?.image ?? ''} alt='User Avatar' />
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='mr-5'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>{session?.user?.name}</DropdownMenuItem>
						<form
							action={logout}
						>
							<DropdownMenuItem className='px-0'>
								<button type='submit' className='text-red-600 font-medium w-full text-start px-2'>
									Logout
								</button>
							</DropdownMenuItem>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='grid grid-cols-2 gap-5'>
				<div className='bg-gradient-to-tr from-[#3A72EC] to-[#1C92D2] px-5 py-3 rounded-xl'>
					<p className='font-bold text-white'>{completedTasks}</p>
					<p className='text-[#F4F4F4]'>Completed</p>
				</div>
				<div className='bg-gradient-to-tr from-[#3A72EC] to-[#1C92D2] px-5 py-3 rounded-xl'>
					<p className='font-bold text-white'>{pendingTasks}</p>
					<p className='text-[#F4F4F4]'>Pending</p>
				</div>
			</div>
			<SearchTask />
		</header>
	);
}
