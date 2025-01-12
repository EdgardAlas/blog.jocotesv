'use client';

import React from 'react';
import { ClipboardCopy, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export const CodeBlock = ({
	language,
	html,
	codeToCopy,
}: {
	language: string;
	html: string;
	codeToCopy: string;
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(codeToCopy).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div className='relative'>
			<button
				onClick={handleCopy}
				className='absolute right-1 top-1 rounded bg-gray-800 p-1 text-white hover:bg-gray-700'
				aria-label='Copy code'
			>
				{copied ? <ClipboardCheck size={16} /> : <ClipboardCopy size={16} />}
			</button>
			<code
				className={`language-${language}`}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
