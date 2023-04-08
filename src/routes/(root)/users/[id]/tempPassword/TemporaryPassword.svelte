<script lang="ts">
	import { Modal, Toast, Button as FlowButton } from 'flowbite-svelte';

	import Button from '$lib/components/Form/Button.svelte';
	import { notificationFailedToast } from '$lib/utils/notificationToast';

	export let id: string;
	export let name: string;

	let resetPassword = false;
	let loading = false;

	const genPassword = () => {
		let chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let passwordLength = 12;
		let password = '';
		for (let i = 0; i <= passwordLength; i++) {
			let randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}
		return password;
	};

	const temporaryPassword = genPassword();

	let showPassword = false;

	const setTemporaryPassword = async () => {
		loading = true;
		try {
			const response = await fetch(`/users/${id}/tempPassword`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, password: temporaryPassword })
			});

			if (response.ok) {
				resetPassword = false;
				showPassword = true;
			} else {
				notificationFailedToast('Failed to update password');
			}
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};
</script>

<Button
	type="button"
	on:click={() => {
		resetPassword = true;
	}}>Set a Temporary Password</Button
>

<Toast class="mt-2" bind:open={resetPassword}>
	<span class="font-semibold text-gray-900 dark:text-white">Set Password for {name}?</span>
	<div class="mt-3" slot="extra">
		<div class="grid grid-cols-2 gap-2">
			<FlowButton size="xs" class="w-full" on:click={setTemporaryPassword} {loading}
				>Set Password</FlowButton
			>
			<FlowButton on:click={() => (resetPassword = false)} size="xs" class="w-full" color="dark"
				>Cancel</FlowButton
			>
		</div>
	</div>
</Toast>

<Modal bind:open={showPassword}>
	<div class="flex items-center gap-2">
		<span class="text-green-600">
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				stroke-width="2"
				><path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/></svg
			>
		</span>

		Temporary password successfully set: <span class="font-bold">{temporaryPassword}</span>
	</div>
</Modal>
