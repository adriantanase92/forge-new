<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';

	export let data;

	$: roles = data.roles ?? [];
	$: console.log('roles: ', roles);
</script>

<Box>
	<div class="flex justify-between items-center mb-8">
		<PageTitle text={capitalize($LL.modules.roles.entity.multiple())} />
		<Button
			class="py-2 px-4"
			kind="fill"
			color="cobalt"
			icon="plus"
			iconHeight="24"
			iconWidth="24"
			iconColor={colors.white}
			on:click={() => console.log('open add modal')}
		>
			{$LL.buttonsOrLinks.addSomething({
				something: $LL.modules.roles.entity.single()
			})}
		</Button>
	</div>

	<DynamicDataRenderer
		layout="grid"
		gap="gap-6"
		gridClasses="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
	>
		{#each roles as role}
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
		{:else}
			<p>{$LL.errors.noSomethingFound({ something: $LL.modules.roles.entity.multiple() })}</p>
		{/each}
	</DynamicDataRenderer>
</Box>
