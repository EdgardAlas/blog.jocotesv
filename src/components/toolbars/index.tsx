import { AlignCenterToolbar } from '@/components/toolbars/align-center-toolbar';
import { AlignJustifyToolbar } from '@/components/toolbars/align-justify-toolbar';
import { AlignLeftToolbar } from '@/components/toolbars/align-left-toolbar';
import { AlignRightToolbar } from '@/components/toolbars/align-right-toolbar';
import { BlockquoteToolbar } from '@/components/toolbars/blockquote-toolbar';
import { BoldToolbar } from '@/components/toolbars/bold-toolbar';
import { BulletListToolbar } from '@/components/toolbars/bullet-list-toolbar';
import { CodeToolbar } from '@/components/toolbars/code-toolbar';
import { ColorHighlightToolbar } from '@/components/toolbars/color-and-highlight';
import { HardBreakToolbar } from '@/components/toolbars/hard-break-toolbar';
import {
	HeadingToolbar,
	IndividualHeadingToolbar,
} from '@/components/toolbars/heading-toolbar';
import { HorizontalRuleToolbar } from '@/components/toolbars/horizontal-rule-toolbar';
import { ItalicToolbar } from '@/components/toolbars/italic-toolbar';
import { LinkToolbar } from '@/components/toolbars/link-toolbar';
import { OrderedListToolbar } from '@/components/toolbars/ordered-list-toolbar';
import { RedoToolbar } from '@/components/toolbars/redo-toolbar';
import { StrikeToolbar } from '@/components/toolbars/strike-toolbar';
import { UnderlineToolbar } from '@/components/toolbars/underline-toolbar';
import { UndoToolbar } from '@/components/toolbars/undo-toolbar';
import { UploadImageToolbar } from '@/components/toolbars/upload-image-toolbar';
import { Separator } from '@/components/ui/separator';

export const ToolbarsGroup = () => {
	return (
		<>
			<UndoToolbar />
			<RedoToolbar />
			<Separator orientation='vertical' className='h-9' />
			<HeadingToolbar />
			<BlockquoteToolbar />
			<BoldToolbar />
			<ColorHighlightToolbar />
			<StrikeToolbar />
			<ItalicToolbar />
			<UnderlineToolbar />
			<AlignLeftToolbar />
			<AlignCenterToolbar />
			<AlignRightToolbar />
			<AlignJustifyToolbar />
			<HorizontalRuleToolbar />
			<LinkToolbar />
			<UploadImageToolbar />
			<BulletListToolbar />
			<OrderedListToolbar />
			<HardBreakToolbar />
			<CodeToolbar />
		</>
	);
};

export const BubbleToolbar = () => {
	return (
		<>
			<IndividualHeadingToolbar level={2} />
			<IndividualHeadingToolbar level={3} />
			<BlockquoteToolbar />
			<BoldToolbar />
			<ColorHighlightToolbar />
			<StrikeToolbar />
			<ItalicToolbar />
			<UnderlineToolbar />
			<AlignLeftToolbar />
			<AlignCenterToolbar />
			<AlignRightToolbar />
			<AlignJustifyToolbar />
		</>
	);
};

export const FloatingToolbar = () => {
	return (
		<>
			<IndividualHeadingToolbar level={2} />
			<IndividualHeadingToolbar level={3} />
			<BlockquoteToolbar />
			<HorizontalRuleToolbar />
			<BulletListToolbar />
			<OrderedListToolbar />
			<HardBreakToolbar />
			<CodeToolbar />
		</>
	);
};
