/* eslint-disable @next/next/no-img-element */
import { CodeBlock } from '@/components/ui/copy-code';
import { toHtml } from 'hast-util-to-html';
import htmlToReact from 'html-react-parser';
import { all, createLowlight } from 'lowlight';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const lowlight = createLowlight(all);

export const RenderHTML = ({ code }: { code: string }) => {
	return (
		<div className='post'>
			{htmlToReact(code, {
				replace(domNode) {
					if (domNode.type === 'tag' && domNode.name === 'code') {
						const language =
							domNode.attribs.class?.replace('language-', '') || 'plaintext';

						const data = (domNode.children[0] as ChildrenWithData)?.data ?? '';

						const highlighted = language
							? lowlight.highlight(language, data ?? '')
							: lowlight.highlightAuto(data ?? '');

						const html = toHtml(highlighted);

						return (
							<CodeBlock language={language} html={html} codeToCopy={data} />
						);
					}

					if (domNode.type === 'tag' && domNode.name === 'img') {
						return (
							<Zoom>
								<img
									className='h-auto w-auto max-w-full'
									src={domNode.attribs.src}
									alt={domNode.attribs.alt}
								/>
							</Zoom>
						);
					}

					return domNode;
				},
			})}
		</div>
	);
};

type ChildrenWithData = {
	data: string;
};
