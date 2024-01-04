export const capitalize = (text: string = ''): string =>
	text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : '';

export const clickOutside = (node: Node) => {
	const handleClick = (event: Event) => {
		const { target } = event;
		if (!node.contains(target as HTMLElement)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const formatObjectFromTable = (obj: Record<string, { value: unknown }>) => {
	const simplified: Record<string, unknown> = {};

	for (const key in obj) {
		if (
			Object.prototype.hasOwnProperty.call(obj, key) &&
			typeof obj[key] === 'object' &&
			'value' in obj[key]
		) {
			simplified[key] = obj[key].value;
		}
	}

	return simplified;
};

export const escapeString = (str: string): string => {
	return (
		str
			.replace(/[&]/g, '&amp;')
			.replace(/[<]/g, '&lt;')
			.replace(/[>]/g, '&gt;')
			.replace(/["]/g, '&quot;')
			.replace(/[']/g, '&#039;')
			.replace(/[/]/g, '&#x2F;')
			.replace(/[\\]/g, '&#x5C;')
			.replace(/[-]/g, '&#x2D;')
			// eslint-disable-next-line no-useless-escape
			.replace(/[\`]/g, '&#96;')
	);
};

export const formatDateTime = (dateString: Date): { date: string; time: string } => {
	const date = new Date(dateString);

	const optionsDate: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};
	const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);

	const optionsTime: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	};
	const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

	return {
		date: formattedDate,
		time: formattedTime
	};
};
