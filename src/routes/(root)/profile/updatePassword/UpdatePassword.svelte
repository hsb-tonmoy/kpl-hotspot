<script lang="ts">
	import { FloatingLabelInput, Helper, Modal } from 'flowbite-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import Button from '$lib/components/Form/Button.svelte';
	import { notificationFailedToast, notificationSuccessToast } from '$lib/utils/notificationToast';

	const schema = yup.object().shape({
		password: yup.string().required('Password is required'),
		confirmPassword: yup
			.string()
			.required('Confirm password is required')
			.oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	let resetPassword = false;

	const { form, data, errors, isValid, isSubmitting } = createForm({
		initialValues: {
			password: '',
			confirmPassword: ''
		},
		extend: validator({ schema }),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/profile/updatePassword', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					resetPassword = false;
					notificationSuccessToast('Password updated successfully');
				} else {
					notificationFailedToast('Failed to update password');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<Button
	type="button"
	on:click={() => {
		resetPassword = true;
	}}>Reset Password</Button
>

<Modal bind:open={resetPassword} title="Reset Your Password">
	<form class="px-4 py-6 mb-8" use:form>
		<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<FloatingLabelInput id="password" name="password" type="password" label="New Password" />
				{#if $errors.password}
					<Helper color="red" class="mt-2">{$errors.password}</Helper>
				{/if}
			</div>
			<div>
				<FloatingLabelInput
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					label="Confirm New Password"
				/>
				{#if $errors.confirmPassword}
					<Helper color="red" class="mt-2">{$errors.confirmPassword}</Helper>
				{/if}
			</div>
		</section>
		<div class="flex justify-between items-center">
			<Button type="submit" disabled={!$isValid || $isSubmitting} loading={$isSubmitting}
				>Update Password</Button
			>
		</div>
	</form>
</Modal>
