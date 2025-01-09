'use client';

import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { Upload } from 'lucide-react';

export const UploadMediaButton = () => {
	return (
		<AddItemCrudButton icon={Upload} openModal={'upload'}>
			Upload
		</AddItemCrudButton>
	);
};
