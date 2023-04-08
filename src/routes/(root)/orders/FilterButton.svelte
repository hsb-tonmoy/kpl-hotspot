<script>
	export let selected = false;
	export let cross = false;
</script>

<button
	on:click
	class="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 hover:border-gray-300 text-sm text-gray-400 {selected
		? 'border-2 border-gray-200 font-bold'
		: 'border border-gray-400 font-normal'}"
>
	<slot />
	{#if selected && cross}
		<span class="fill-gray-200">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4 text-gray-700"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</span>
	{/if}
</button>
