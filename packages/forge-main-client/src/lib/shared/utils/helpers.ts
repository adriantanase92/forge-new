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
