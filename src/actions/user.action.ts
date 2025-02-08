import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
	try {
		const session = await auth();
		if (!session?.user) return null;

		const currentUser = await prisma.user.findFirst({
			where: {
				id: session.user.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
			},
		});

		return currentUser;
	} catch (error) {
		console.error('failed to get current user:', error);
	}
}