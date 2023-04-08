<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { convertStatus } from '$lib/utils/convertStatus';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';
	import Filters from './Filters.svelte';

	let paginatedData: any[] = [];

	export let data: PageData;
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Orders</h2>
		<div class="flex items-center justify-between mb-4">
			<div class="inline-flex items-center gap-2">
				<h4 class="text-lg font-semibold text-gray-600 dark:text-gray-300">Latest Orders</h4>
				<!-- <Filters params={Object.fromEntries($page.url.searchParams.entries())} /> -->
			</div>
			<a href="/orders/add">
				<button
					class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-primary hover:bg-primaryDarker focus:outline-none focus:shadow-outline-purple"
				>
					New Order
					<span class="ml-2" aria-hidden="true">+</span>
				</button>
			</a>
		</div>
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
			<div class="w-full overflow-x-auto">
				<table class="w-full whitespace-no-wrap">
					<thead>
						<tr
							class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
						>
							<th class="px-4 py-3">ID</th>
							<th class="px-4 py-3">Student Last Name</th>
							<th class="px-4 py-3">Student First Name</th>
							<th class="px-4 py-3">Student ID</th>
							<th class="px-4 py-3">Student School</th>
							<th class="px-4 py-3">Status</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{#each paginatedData as order}
							<tr
								on:click={() => goto(`/orders/${order.id}`)}
								class="text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer whitespace-nowrap"
							>
								<td class="px-4 py-3 text-sm">{order.id}</td>
								<td class="px-4 py-3 text-sm"> {order.studentLastName} </td>
								<td class="px-4 py-3 text-sm"> {order.studentFirstName} </td>
								<td class="px-4 py-3 text-sm"> {order.studentID} </td>
								<td class="px-4 py-3 text-sm"> {order.studentSchoolName} </td>
								<td class="px-4 py-3 text-sm">
									{@html convertStatus(order.status)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<Pagination items={data.orders} bind:paginatedData />
		</div>
	</div>
</main>
