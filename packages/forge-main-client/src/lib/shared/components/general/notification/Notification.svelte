<script lang="ts">
	import { SvgIcon } from '../svg';
	import type { notificationKind, notificationType } from './type';
	import { getIconBasedOnType, getCssClasses, getIconColor } from './utils';

	// Specify the id of button
	export let id: string = crypto.randomUUID();

	// Specify the kind of the notification
	export let kind: notificationKind = 'fill';

	// Specify the type of the notification
	export let type: notificationType = 'info';

	// Specify the type of the notification
	export let message: string = '';

	$: notificationProps = {
		id,
		class: [
			'flex items-center p-2',
			kind && type && getCssClasses(kind, type),
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<div {...notificationProps}>
	<div class="mr-2 p-2">
		{#key type}
			<SvgIcon
				name={getIconBasedOnType(type)}
				width="30"
				height="30"
				color={getIconColor(type)}
			/>
		{/key}
	</div>

	{#if $$slots.default}
		<slot />
	{/if}

	{#if message.length > 0}
		{message}
	{/if}
</div>
