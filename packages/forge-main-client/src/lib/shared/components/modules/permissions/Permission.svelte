<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { colors, type Permission } from '$lib/shared';
	import Button from '../../general/button/Button.svelte';

	export let permission: Permission;

	const dispatch = createEventDispatcher();
	const onClickAction = ({
		action,
		permission
	}: {
		action: 'edit' | 'delete';
		permission: Permission;
	}) => dispatch('clickActionTriggered', { action, permission });
</script>

{#if permission}
	<div
		class="bg-gallery rounded-xl group p-6 shadow-sm border border-rhino hover:border-cobalt border-solid flex justify-between items-center"
	>
		<div class="capitalize text-xl font-semibold group-hover:text-cobalt">
			{permission.name}
		</div>
		<div class="flex gap-2">
			<Button
				class="p-2"
				kind="icon"
				color="rhino"
				icon="pencil"
				iconHeight="18"
				iconWidth="18"
				iconColor={colors.white}
				on:click={(e) => onClickAction({ action: 'edit', permission })}
			/>
			<Button
				class="p-2"
				kind="icon"
				color="error"
				icon="bin"
				iconHeight="18"
				iconWidth="18"
				iconColor={colors.white}
				on:click={(e) => onClickAction({ action: 'delete', permission })}
			/>
		</div>
	</div>
{/if}
