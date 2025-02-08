'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import SafeHtml from '@/components/SafeHtml';
import Image from 'next/image';
import { Task } from '@prisma/client';
import { Session } from '@auth/core/types';
import { logout } from '@/actions/auth.actions';

interface DetailTaskClientProps {
	task: Task;
	session: Session | null;
}

export default function DetailTaskClient({ task, session }: DetailTaskClientProps) {
	return (
		<div className='p-5 bg-[#EDF3FF] min-h-screen'>
			<div className='flex items-center justify-between w-full'>
				<Image
					src='/brand-page-detail.svg'
					alt='Brand Icon'
					width={110}
					height={110}
					draggable={false}
				/>
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
						<form action={logout}>
							<DropdownMenuItem className='px-0'>
								<button type='submit' className='text-red-600 font-medium w-full text-start px-2'>
									Logout
								</button>
							</DropdownMenuItem>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Breadcrumb className='my-5'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className='font-medium'>Detail</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='space-y-2'>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-[#707070] font-medium'>
						{task.updatedAt && new Date(task.updatedAt) > new Date(task.createdAt)
							? `Updated ${formatDistanceToNow(task.updatedAt)} ago`
							: `${formatDistanceToNow(new Date(task.createdAt))} ago`}
					</p>
					<div
						className={`px-3 py-1 ${
							task?.status === 'PENDING'
								? 'bg-red-500 shadow-red-200'
								: 'bg-green-500 shadow-green-200'
						}  text-white text-xs rounded-full shadow-md `}
					>
						{task?.status.toLocaleLowerCase()}
					</div>
				</div>

				<div>
					<h1 className='text-2xl font-medium'>{task?.title}</h1>
				</div>
			</div>
			<Separator className='mt-2 mb-4' />
			<SafeHtml html={task?.content ?? ''} />
		</div>
	);
}
