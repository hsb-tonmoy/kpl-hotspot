import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const POST = (async ({ request, locals }) => {
	const formData = await request.json();
	const { user } = await locals.validateUser();

	try {
		const password = await auth.updateUserPassword(user.userId, formData.password);
		if (password) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Error updating password');
}) satisfies RequestHandler;
