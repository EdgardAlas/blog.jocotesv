import { toHtml } from 'hast-util-to-html';
import htmlToReact from 'html-react-parser';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

export const RenderHTML = ({ code }: { code: string }) => {
	return (
		<div className='post'>
			{htmlToReact(code, {
				replace(domNode) {
					if (domNode.type === 'tag' && domNode.name === 'code') {
						const language =
							domNode.attribs.class?.replace('language-', '') || 'plaintext';

						const highlighted = language
							? lowlight.highlight(
									language,
									(domNode.children[0] as ChildrenWithData)?.data ?? ''
								)
							: lowlight.highlightAuto(
									(domNode.children[0] as ChildrenWithData)?.data ?? ''
								);

						const html = toHtml(highlighted);

						return (
							<code
								className={`language-${language}`}
								dangerouslySetInnerHTML={{ __html: html }}
							/>
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
