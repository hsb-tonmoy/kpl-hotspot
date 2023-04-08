export function convertStatus(status: string, small = false) {
	let sizeClass = small ? 'text-xs' : 'text-sm';
	switch (status) {
		case 'new':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-gray-400 rounded-full dark:bg-gray-600"
                >
                  New
                </span>`;
		case 'user-not-found':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-red-500 rounded-full dark:bg-red-600"
                >
                  User Not Found
                </span>`;
		case 'checked-out':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-green-500 rounded-full dark:bg-green-700"
                >
                Checked Out
                </span>`;
		default:
			return 'New';
	}
}
