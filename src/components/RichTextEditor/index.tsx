'use client';

import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
	content: string;
	setContent: (content: string) => void;
}

export default function RichTextEditor({ content, setContent }: RichTextEditorProps) {
	const handleChange = (value: string) => {
		if (value === '<p><br></p>') {
			setContent('');
		} else {
			setContent(value);
		}
	};

	return (
		<div className='bg-white h-48 max-h-48'>
			<ReactQuill
				theme='snow'
				value={content}
				onChange={handleChange}
				placeholder='Write something here...'
				className='h-[124px] sm:h-[150px] bg-white'
			/>
			<style jsx global>{`
				.ql-editor {
					word-break: break-word; /* Pecah kata panjang */
					overflow-wrap: break-word; /* Pastikan teks tetap dalam batas */
					white-space: pre-wrap; /* Jaga format newline */
				}
			`}</style>
		</div>
	);
}
