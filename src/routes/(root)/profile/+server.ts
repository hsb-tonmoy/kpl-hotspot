import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { prisma } from '$lib/server/prisma';

export const PATCH = (async ({ request, locals }) => {
	const { user } = await locals.validateUser();
	const formData = await request.json();

	try {
		const profile = await prisma.user.update({
			where: {
				email: user?.email
			},
			data: formData
		});
		if (profile) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Error updating profile');
}) satisfies RequestHandler;
