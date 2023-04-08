<script lang="ts">
	import { goto } from '$app/navigation';
	import { Modal } from 'flowbite-svelte';
	import { Filter } from '$lib/components/Icons';
	import FilterButton from './FilterButton.svelte';
	import { statuses } from '../constants';
	import queryString from 'query-string';

	let filterShow = false;

	interface FilterParams {
		status: string | null;
		type: string | null;
	}
	export let params: FilterParams;

	let filterParams = {
		status: params.status || null,
		type: params.type || null
	};

	function filterParamsToggle(filter: string, value: string) {
		if (filterParams[filter as keyof FilterParams] === value) {
			filterParams[filter as keyof FilterParams] = null;
		} else {
			filterParams[filter as keyof FilterParams] = value;
		}
	}

	function applyFilter() {
		const searchParams = queryString.stringify(filterParams, {
			skipNull: true
		});

		filterShow = false;

		goto(`?${searchParams}`);
	}
</script>

<button
	on:click={() => {
		filterShow = true;
	}}
	class="block w-7 h-7 {Object.entries(params).length > 0 ? 'text-green-500' : 'text-white'}"
	><Filter /></button
>
<Modal bind:open={filterShow} title="Filters">
	<section class="">
		<h6 class="text-white mb-4 text-base font-medium">Status</h6>
		<div class="flex flex-wrap items-center gap-6">
			{#each statuses as filter}
				<FilterButton
					on:click={() => {
						filterParamsToggle('status', filter.value);
					}}
					selected={filterParams['status'] === filter.value}>{filter.name}</FilterButton
				>
			{/each}
		</div>
	</section>
	<section class="">
		<h6 class="text-white mb-4 text-base font-medium">3D Print Type</h6>
		<div class="flex flex-wrap items-center gap-6">
			{#each types as filter}
				<FilterButton
					on:click={() => {
						filterParamsToggle('type', filter.value);
					}}
					selected={filterParams['type'] === filter.value}>{filter.name}</FilterButton
				>
			{/each}
		</div>
	</section>

	<div class="flex w-full justify-end px-2">
		<button on:click={applyFilter} class="bg-primary px-6 py-2 rounded-md text-white">Apply</button>
	</div>
</Modal>
