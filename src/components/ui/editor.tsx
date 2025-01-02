import { ToolbarProvider } from '@/components/toolbars/toolbar-provider';
import Blockquote from '@tiptap/extension-blockquote';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import HardBreak from '@tiptap/extension-hard-break';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import {
	EditorContent,
	NodeViewProps,
	ReactNodeViewRenderer,
	useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';
import ImageResize from 'tiptap-extension-resize-image';

const lowlight = createLowlight(all);

import { ToolbarsGroup } from '@/components/toolbars';
import { Skeleton } from '@/components/ui/skeleton';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useRef } from 'react';

export const CodeBlockComponent = ({
	node: {
		attrs: { language: defaultLanguage },
	},
	updateAttributes,
	extension,
}: NodeViewProps) => (
	<NodeViewWrapper className='code-block'>
		<select
			className='h-8 rounded-md border border-input px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
			contentEditable={false}
			defaultValue={defaultLanguage}
			onChange={(event) => updateAttributes({ language: event.target.value })}
			onClick={(event) => event.stopPropagation()}
		>
			{extension.options.lowlight
				.listLanguages()
				.map((lang: string, index: number) => (
					<option key={index} value={lang}>
						{lang}
					</option>
				))}
		</select>
		<pre>
			<NodeViewContent as='code' />
		</pre>
	</NodeViewWrapper>
);

interface EditorProps {
	onChange?: (e: {
		target: {
			value: string;
		};
	}) => void;
	value?: string;
	ref?: React.RefObject<HTMLDivElement>;
}

export const Editor = ({ onChange, value }: EditorProps) => {
	const debounce = useRef<NodeJS.Timeout | null>(null);

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				blockquote: false,
				codeBlock: false,
				horizontalRule: false,
				hardBreak: false,
				listItem: false,
			}),
			Placeholder.configure({
				placeholder: 'Write something …',
			}),
			Blockquote,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight.configure({
				multicolor: true,
			}),

			TextStyle,
			Color,
			Underline,
			HorizontalRule,
			HardBreak,
			ListItem,
			CodeBlockLowlight.extend({
				addNodeView() {
					return ReactNodeViewRenderer(CodeBlockComponent);
				},
			}).configure({ lowlight, defaultLanguage: 'plaintext' }),
			ImageResize.extend({
				addAttributes() {
					return {
						src: {
							default: null,
						},
						alt: {
							default: null,
						},
						style: {
							default:
								'width: auto; height: auto; cursor: pointer; max-width: 100%;',
						},
						'data-id': {
							default: null,
						},
					};
				},
			}).configure({}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
				protocols: ['http', 'https'],
				isAllowedUri: (url, ctx) => {
					try {
						// construct URL
						const parsedUrl = url.includes(':')
							? new URL(url)
							: new URL(`${ctx.defaultProtocol}://${url}`);

						// use default validation
						if (!ctx.defaultValidate(parsedUrl.href)) {
							return false;
						}

						// disallowed protocols
						const disallowedProtocols = ['ftp', 'file', 'mailto'];
						const protocol = parsedUrl.protocol.replace(':', '');

						if (disallowedProtocols.includes(protocol)) {
							return false;
						}

						// only allow protocols specified in ctx.protocols
						const allowedProtocols = ctx.protocols.map((p) =>
							typeof p === 'string' ? p : p.scheme
						);

						if (!allowedProtocols.includes(protocol)) {
							return false;
						}

						// all checks have passed
						return true;
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
					} catch (error) {
						return false;
					}
				},
			}),
		],
		content: value,
		editorProps: {
			attributes: {
				class:
					'rounded-md min-h-[300px] p-4 bg-white shadow-sm border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
			},
		},

		onUpdate(e) {
			if (debounce.current) {
				clearTimeout(debounce.current);
			}

			debounce.current = setTimeout(() => {
				onChange?.({
					target: {
						value: e.editor.getHTML().replaceAll('contenteditable="true"', ''),
					},
				});
			}, 300);
		},
		shouldRerenderOnTransaction: false,
	});

	if (!editor)
		return (
			<div>
				<Skeleton className='h-[395px]' />
			</div>
		);

	return (
		<div className='relative'>
			<ToolbarProvider editor={editor}>
				<ToolbarsGroup />
			</ToolbarProvider>
			<div
				onClick={() => {
					editor?.chain().focus().run();
				}}
			>
				<EditorContent editor={editor} className='post mx-auto mt-4' />
			</div>
		</div>
	);
};
