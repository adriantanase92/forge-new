<script lang="ts">
	import { colors, type Role } from '$lib/shared';
	import Button from '../../general/button/Button.svelte';

	export let role: Role;
</script>

{#if role}
	<div
		class="rounded-xl group p-6 shadow-sm border border-rhino hover:border-cobalt border-solid flex justify-between items-center"
	>
		<div class="capitalize text-xl font-semibold group-hover:text-cobalt">
			{role.name}
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
				on:click={() => console.log(`edit role ${role.id}`)}
			/>
			<Button
				class="p-2"
				kind="icon"
				color="error"
				icon="bin"
				iconHeight="18"
				iconWidth="18"
				iconColor={colors.white}
				on:click={() => console.log(`delete role ${role.id}`)}
			/>
		</div>
	</div>
{/if}
