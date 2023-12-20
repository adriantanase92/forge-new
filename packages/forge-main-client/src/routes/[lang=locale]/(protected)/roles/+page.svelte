<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Role from '$lib/shared/components/modules/roles/Role.svelte';

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

	<DynamicDataRenderer layout="list" gap="gap-6">
		{#each roles as role}
			<Role {role} />
		{:else}
			<p>{$LL.errors.noSomethingFound({ something: $LL.modules.roles.entity.multiple() })}</p>
		{/each}
	</DynamicDataRenderer>
</Box>
