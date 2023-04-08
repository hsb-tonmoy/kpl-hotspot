<script>
	import { goto } from '$app/navigation';
	import { SpinLine } from 'svelte-loading-spinners';
	import { Trash } from '$lib/components/Icons';
	import { notificationFailedToast } from '$lib/utils/notificationToast';

	export let id;

	let deleting = false;

	const deleteUser = async () => {
		deleting = true;
		try {
			const response = await fetch(`/users?id=${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				goto('/users');
			} else {
				notificationFailedToast('Something went wrong');
			}
		} catch (error) {
			console.error(error);
		}
		deleting = false;
	};
</script>

<button
	type="button"
	on:click={deleteUser}
	class="inline-flex items-center justify-center px-4 py-2 border border-red-600 rounded-md bg-transparent hover:bg-red-600 text-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
	><span class="block w-4 h-4">
		{#if deleting}
			<SpinLine size="36" unit="px" color="#fff" duration="2s" />
		{:else}
			<Trash />
		{/if}
	</span></button
>
