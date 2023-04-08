import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.validateUser();
	if (!user) {
		throw redirect(302, '/');
	}
	const profile = await prisma.user.findUnique({
		where: {
			email: user.email
		}
	});

	return {
		profile
	};
};
