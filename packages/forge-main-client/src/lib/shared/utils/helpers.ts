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
