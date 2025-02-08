import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from '@/lib/auth';
import { Button } from '../ui/button';

export default function Login() {
	return (
		<div className='min-h-screen bg-[#2A4070]'>
			<div className='flex items-center justify-center'>
				<Image
					src='/Brand.png'
					alt='brand logo'
					width={150}
					height={150}
					className='absolute top-10'
					draggable={false}
				/>
			</div>
			<div className='flex items-center justify-center h-screen'>
				<form
					action={async () => {
						'use server';

						await signIn('github');
					}}
				>
					<Button type='submit' className='hover:bg-black'>
						<AiFillGithub />
						Continue with Github
					</Button>
				</form>
			</div>
		</div>
	);
}
