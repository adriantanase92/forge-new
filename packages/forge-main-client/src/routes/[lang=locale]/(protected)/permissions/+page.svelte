<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Permission from '$lib/shared/components/modules/permissions/Permission.svelte';
	import AddEditModal from '$lib/shared/components/general/modal/AddEditModal.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';

	export let data;

	$: permissions = data.permissions ?? [];
	$: console.log('permissions: ', permissions);

	// Setup for Modals ------------------------------------------------------------------------
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let editPermissionData: Permission | null = null;

	const handleAction = (event: CustomEvent<{ permission: Permission }>) => {
		const { permission } = event.detail;
		editPermissionData = structuredClone(permission);
		modalState = 'edit';
		openAddEditModal = true;
	};

	// Setup for Add Form ----------------------------------------------------------------------

	// Setup for Edit Form ---------------------------------------------------------------------
</script>

<Box>
	<div class="flex justify-between items-center mb-8">
		<PageTitle text={capitalize($LL.modules.permissions.entity.multiple())} />
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
				something: $LL.modules.permissions.entity.single()
			})}
		</Button>
	</div>

	<DynamicDataRenderer
		layout="grid"
		gap="gap-6"
		gridClasses="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
	>
		{#each permissions as permission}
			<Permission {permission} on:clickActionTriggered={handleAction} />
		{:else}
			<p>
				{$LL.errors.noSomethingFound({
					something: $LL.modules.permissions.entity.multiple()
				})}
			</p>
		{/each}
	</DynamicDataRenderer>
</Box>

{#if openAddEditModal}
	<AddEditModal
		bind:open={openAddEditModal}
		{modalState}
		entity={modalState === 'add'
			? $LL.modules.permissions.entity.single()
			: `${editPermissionData?.name} ${$LL.modules.permissions.entity.single()}`}
	>
		<div slot="add-form">add form</div>
		<div slot="edit-form">edit form</div>
	</AddEditModal>
{/if}
