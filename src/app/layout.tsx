import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { TaskProvider } from '@/context/TaskContext';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Todol',
	description: 'A simple todo list app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} ${inter.className} antialiased`}>
				<TaskProvider>
					{children}
					<Toaster />
				</TaskProvider>
			</body>
		</html>
	);
}
