'use client';

import { useEffect, useState } from 'react';

const getDOMPurify = async () => {
	const dompurify = await import('dompurify');
	return dompurify.default;
};

export default function SafeHtml({ html }: { html: string }) {
	const [sanitizedHtml, setSanitizedHtml] = useState('');

	useEffect(() => {
		getDOMPurify().then((DOMPurify) => {
			setSanitizedHtml(DOMPurify.sanitize(html));
		});
	}, [html]);

	return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className='text-[#303030] font-medium' />;
}
