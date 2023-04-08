<script>
	import { FloatingLabelInput, Helper, Modal, Toggle } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';
	import { goto } from '$app/navigation';
	import { notificationFailedToast, notificationSuccessToast } from '$lib/utils/notificationToast';

	import UpdatePassword from './updatePassword/UpdatePassword.svelte';

	const schema = yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().email('Email is invalid')
	});

	export let user = {};

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			name: user.name,
			email: user.email,
			position: user.position
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/users', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					notificationSuccessToast('User updated successfully');
				} else {
					notificationFailedToast('Failed to update user');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<form class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800" use:form>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div>
			<FloatingLabelInput id="name" name="name" type="text" label="Name" />
			{#if $errors.name}
				<Helper color="red" class="mt-2">{$errors.name}</Helper>
			{/if}
		</div>

		<div>
			<FloatingLabelInput
				id="email"
				style="filled"
				name="email"
				type="email"
				label="Contact Email"
				disabled
			/>
			{#if $errors.email}
				<Helper color="red" class="mt-2">{$errors.email}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="filled"
				disabled
				id="position"
				name="position"
				type="text"
				label="Position"
			/>
			{#if $errors.position}
				<Helper color="red" class="mt-2">{$errors.position}</Helper>
			{/if}
		</div>
		<div class="">
			<UpdatePassword />
		</div>
	</section>
	<div class="flex justify-between items-center">
		<Button type="submit" disabled={!$isValid || $isSubmitting} loading={$isSubmitting}
			>Save Changes</Button
		>
	</div>
</form>
