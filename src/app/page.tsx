import { auth } from '@/lib/auth';
import Header from '@/components/Header';
import Main from '@/components/Main';
import CreateTask from '@/components/Footer';
import Login from '@/components/Login';

export default async function Home() {
	const session = await auth();

	console.log(session);
	return (
		<>
			{!session ? (
				<Login />
			) : (
				<div className='bg-[#EDF3FF] min-h-screen'>
					<Header session={session} />
					<Main />
					<CreateTask />
				</div>
			)}
		</>
	);
}
