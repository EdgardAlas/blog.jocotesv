'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';

interface NewLangSwitchProps {
	disabled?: boolean;
}

export const NewLangSwitch = ({ disabled }: NewLangSwitchProps) => {
	const [transition, startTransition] = useTransition();

	const [lang, setLang] = useQueryState(
		'lang',
		parseAsString.withDefault('en').withOptions({
			shallow: false,
			startTransition,
			clearOnDefault: true,
		})
	);

	return (
		<div>
			<Select
				defaultValue='en'
				disabled={disabled || transition}
				onValueChange={(e) => {
					if (disabled || transition) {
						return;
					}

					setLang(e);
				}}
				value={lang}
			>
				<SelectTrigger className='bg-white'>
					<SelectValue placeholder='Select language' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='en'>English</SelectItem>
					<SelectItem value='es'>Spanish</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
