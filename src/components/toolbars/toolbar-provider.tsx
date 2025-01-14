import { cn } from '@/lib/utils';
import type { Editor } from '@tiptap/react';
import React, { useEffect } from 'react';

export interface ToolbarContextProps {
	editor: Editor;
}

export const ToolbarContext = React.createContext<ToolbarContextProps | null>(
	null
);

interface ToolbarProviderProps {
	editor: Editor;
	children: React.ReactNode;
	className?: string;
}

export const ToolbarProvider = ({
	editor,
	children,
	className,
}: ToolbarProviderProps) => {
	return (
		<ToolbarContext.Provider value={{ editor }}>
			<div className={cn('flex flex-wrap gap-1', className)}>{children}</div>
		</ToolbarContext.Provider>
	);
};

export const useToolbar = () => {
	const context = React.useContext(ToolbarContext);

	if (!context) {
		throw new Error('useToolbar must be used within a ToolbarProvider');
	}

	return context;
};

export const useEditorActive = (
	name: string | Record<string, unknown>,
	attributes?: Record<string, unknown>
) => {
	const { editor } = useToolbar();

	const [isActive, setIsActive] = React.useState(false);

	useEffect(() => {
		const handleSelectionChange = () => {
			/* setIsActive(editor?.isActive(name) ?? false); */

			if (typeof name === 'string' && attributes) {
				setIsActive(editor?.isActive(name, attributes) ?? false);
			} else if (typeof name === 'string' && !attributes) {
				setIsActive(editor?.isActive(name) ?? false);
			} else {
				setIsActive(editor?.isActive(name) ?? false);
			}
		};

		editor?.on('selectionUpdate', handleSelectionChange);
		editor.on('transaction', handleSelectionChange);

		return () => {
			editor?.off('selectionUpdate', handleSelectionChange);
			editor.off('transaction', handleSelectionChange);
		};
	}, [editor, name, attributes]);

	return isActive;
};

export const useEditorActiveAttributes = (name: string) => {
	const { editor } = useToolbar();

	const [attributes, setAttributes] = React.useState<Record<string, TODO>>({});

	useEffect(() => {
		const handleSelectionChange = () => {
			setAttributes(editor?.getAttributes(name) ?? {});
		};

		editor?.on('selectionUpdate', handleSelectionChange);
		editor.on('transaction', handleSelectionChange);

		return () => {
			editor?.off('selectionUpdate', handleSelectionChange);
			editor.off('transaction', handleSelectionChange);
		};
	}, [editor, name]);

	return attributes;
};
