import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { prisma } from '$lib/server/prisma';

export const POST = (async ({ request }) => {
	const requestData = await request.json();

	try {
		const order = await prisma.order.create({
			data: requestData
		});
		if (order) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order failed');
}) satisfies RequestHandler;

export const PATCH = (async ({ request, url }) => {
	const requestData = await request.json();

	const searchParams = Object.fromEntries(url.searchParams.entries());
	const id = parseInt(searchParams.id);

	delete requestData.id;

	try {
		const order = await prisma.order.update({
			where: {
				id: id
			},
			data: requestData
		});

		return json({ success: true });
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order update failed');
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const requestData = await request.json();

	const { id } = requestData;

	try {
		const order = await prisma.order.delete({
			where: {
				id: id
			}
		});

		return json({ success: true });
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order deletion failed');
}) satisfies RequestHandler;
