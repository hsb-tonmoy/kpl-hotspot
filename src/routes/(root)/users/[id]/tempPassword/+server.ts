import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const POST = (async ({ request }) => {
	const formData = await request.json();

	try {
		const user = await auth.updateUserPassword(formData.id, formData.password);
		if (user) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Error setting password');
}) satisfies RequestHandler;
