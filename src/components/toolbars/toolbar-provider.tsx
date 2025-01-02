'use client';

import { cn } from '@/lib/utils';
import type { Editor } from '@tiptap/react';
import React from 'react';

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
