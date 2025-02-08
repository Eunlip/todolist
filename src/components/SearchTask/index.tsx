'use client';

import { useTasksContext } from '@/hooks/useTaskContext';
import { SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export default function SearchTask() {
	const { searchTasks } = useTasksContext();
	const [query, setQuery] = useState<string>('');

	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.focus();
	};

	const handleSearch = (text: string) => {
		setQuery(text);
		searchTasks(text);
	};

	return (
		<button
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') handleClick();
			}}
			className='rounded-full w-full cursor-default bg-white flex items-center px-5 py-3 gap-3'
		>
			<SearchIcon className='w-5 h-5 text-[#71717A]' />
			<input
				ref={inputRef}
				type='text'
				placeholder='search tasks...'
				className='placeholder:font-medium placeholder:text-[#71717A] focus:outline-0 w-full'
				value={query}
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</button>
	);
}
