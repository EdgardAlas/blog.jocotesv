'use client';

import { ComponentProps, useState } from 'react';
import {
	FieldValues,
	FormProvider as LibFormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from 'react-hook-form';

interface FormProviderProps<T extends FieldValues>
	extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	onValidationError?: SubmitErrorHandler<T>;
}

export const FormProvider = <T extends FieldValues>(
	props: FormProviderProps<T>
) => {
	const { onValidationError, onSubmit, form, ...rest } = props;
	const [isLoading, setIsLoading] = useState(false);

	return (
		<LibFormProvider {...form}>
			<form
				noValidate
				{...rest}
				onSubmit={(e) => {
					// Prevent the default form submission
					e.preventDefault();
					// Prevent parent form submission
					e.stopPropagation();

					form.handleSubmit(async (values) => {
						if (isLoading) {
							return;
						}

						setIsLoading(true);
						try {
							await onSubmit(values);
						} catch (error) {
							throw error;
						} finally {
							setIsLoading(false);
						}
					}, onValidationError)();
				}}
			/>
		</LibFormProvider>
	);
};
