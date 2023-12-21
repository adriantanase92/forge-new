<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Role from '$lib/shared/components/modules/roles/Role.svelte';
	import AddEditModal from '$lib/shared/components/general/modal/AddEditModal.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';

	export let data;

	$: roles = data.roles ?? [];
	$: console.log('roles: ', roles);

	// Setup for Modals ------------------------------------------------------------------------
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let editRoleData: Role | null = null;

	const handleAction = (event: CustomEvent<{ role: Role }>) => {
		const { role } = event.detail;
		editRoleData = structuredClone(role);
		modalState = 'edit';
		openAddEditModal = true;
	};

	// Setup for Add Form ----------------------------------------------------------------------

	// Setup for Edit Form ---------------------------------------------------------------------
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
			on:click={() => {
				openAddEditModal = true;
				modalState = 'add';
			}}
		>
			{$LL.buttonsOrLinks.addSomething({
				something: $LL.modules.roles.entity.single()
			})}
		</Button>
	</div>

	<DynamicDataRenderer layout="list" gap="gap-6">
		{#each roles as role}
			<Role {role} on:clickActionTriggered={handleAction} />
		{:else}
			<p>{$LL.errors.noSomethingFound({ something: $LL.modules.roles.entity.multiple() })}</p>
		{/each}
	</DynamicDataRenderer>
</Box>

{#if openAddEditModal}
	<AddEditModal
		bind:open={openAddEditModal}
		{modalState}
		entity={modalState === 'add'
			? $LL.modules.roles.entity.single()
			: `${editRoleData?.name} ${$LL.modules.roles.entity.single()}`}
	>
		<div slot="add-form">add form</div>
		<div slot="edit-form">edit form</div>
	</AddEditModal>
{/if}
