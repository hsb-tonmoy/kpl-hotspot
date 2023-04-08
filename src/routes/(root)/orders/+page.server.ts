import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const { searchParams } = url;
	const params = Object.fromEntries(searchParams.entries());

	const orders = await prisma.order.findMany({
		include: {
			user: true
		},
		where: {
			deleted: false,
			status: params.status || undefined
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		orders
	};
};
