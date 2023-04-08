<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import { shortcut, type ShortcutEventDetails } from '@svelte-put/shortcut';

	import { FloatingLabelInput, Helper, Label, Select, Textarea } from 'flowbite-svelte';

	import Button from '$lib/components/Form/Button.svelte';

	import { goto } from '$app/navigation';

	import { notificationSuccessToast, notificationFailedToast } from '$lib/utils/notificationToast';

	import { statuses } from '../constants';

	import DeleteOrder from './DeleteOrder.svelte';

	type OrderWithUser = Prisma.OrderGetPayload<{
		include: {
			user: true;
		};
	}>;

	export let editing = false;

	export let order: OrderWithUser;

	export let user;

	let userID = $user?.userId;

	const schema = yup.object().shape({
		studentID: yup.string().required('A student ID is required.'),
		studentFirstName: yup.string().required('A student first name is required.'),
		studentLastName: yup.string().required('A student last name is required.'),
		studentSchoolName: yup.string().required('A student school name is required.'),
		user: yup.string().required(),
		status: yup.string().required('An order status is required')
	});

	const { form, data, errors, isValid, isDirty, isSubmitting, createSubmitHandler, addField } =
		createForm({
			initialValues: {
				user: editing ? order.user.name : $user?.name,
				status: editing ? order.status : 'new',
				studentID: editing ? order.studentID : '',
				studentFirstName: editing ? order.studentFirstName : '',
				studentMiddleName: editing ? order.studentMiddleName : '',
				studentLastName: editing ? order.studentLastName : '',
				studentEmail: editing ? order.studentEmail : '',
				studentSchoolName: editing ? order.studentSchoolName : '',
				comments: editing ? order.comments : ''
			},
			extend: validator({ schema })
		});

	const manualSubmit = createSubmitHandler({
		onSubmit: async (values) => {
			let user = { connect: { id: userID } };
			if (editing) {
				delete values.user;
			}
			if (!editing) {
				values['user'] = user;
			}
			try {
				const response = await fetch(editing ? `/orders/add?id=${order.id}` : '/orders/add', {
					method: editing ? 'PATCH' : 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				if (response.ok) {
					if (!editing) {
						goto('/orders');
					}
					notificationSuccessToast('Order saved successfully');
				} else {
					console.log('Something went wrong.');
					notificationFailedToast('Something went wrong');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});

	function handleSave(detail: ShortcutEventDetails) {
		manualSubmit();
	}
</script>

<form
	on:submit={manualSubmit}
	class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
	use:form
	use:shortcut={{
		trigger: {
			key: 's',
			modifier: ['ctrl'],
			callback: handleSave,
			preventDefault: true
		}
	}}
>
	<h6 class="mb-4 text-base font-semibold text-gray-600 dark:text-gray-300">Status</h6>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="">
			<Label for="status" class="sr-only">Status</Label>
			<Select
				bind:value={$data.status}
				id="status"
				underline
				class="mb-2"
				items={statuses}
				placeholder="Select a status*"
			/>
			{#if $errors.status}
				<Helper color="red" class="mt-2">{$errors.status}</Helper>
			{/if}
		</div>
		<FloatingLabelInput style="filled" id="user" name="user" type="text" label="Staff" disabled />

		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentID"
				name="studentID"
				type="text"
				label="Student ID*"
			/>
			{#if $errors.studentID}
				<Helper color="red" class="mt-2">{$errors.studentID}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentFirstName"
				name="studentFirstName"
				type="text"
				label="Student First Name*"
			/>
			{#if $errors.studentFirstName}
				<Helper color="red" class="mt-2">{$errors.studentFirstName}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentMiddleName"
				name="studentMiddleName"
				type="text"
				label="Student Middle Name"
			/>
			{#if $errors.studentMiddleName}
				<Helper color="red" class="mt-2">{$errors.studentMiddleName}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentLastName"
				name="studentLastName"
				type="text"
				label="Student Last Name*"
			/>
			{#if $errors.studentLastName}
				<Helper color="red" class="mt-2">{$errors.studentLastName}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentEmail"
				name="studentEmail"
				type="text"
				label="Student Email"
			/>
			{#if $errors.studentEmail}
				<Helper color="red" class="mt-2">{$errors.studentEmail}</Helper>
			{/if}
		</div>
		<div class="">
			<FloatingLabelInput
				style="outlined"
				id="studentSchoolName"
				name="studentSchoolName"
				type="text"
				label="Student School Name*"
			/>
			{#if $errors.studentSchoolName}
				<Helper color="red" class="mt-2">{$errors.studentSchoolName}</Helper>
			{/if}
		</div>

		<div class="col-span-2">
			<Textarea id="comments" name="comments" placeholder="Comments on the order" rows="4" />
		</div>
	</section>

	<div class="flex items-center justify-between">
		<Button loading={$isSubmitting} disabled={!$isValid || $isSubmitting} type="submit"
			>{editing ? 'Save Changes' : 'Submit'}</Button
		>
		{#if editing && $user?.isAdmin === true}
			<DeleteOrder {order} />
		{/if}
	</div>
</form>

<style lang="postcss" global>
	.patron {
		@apply text-sm font-medium;
	}
</style>
