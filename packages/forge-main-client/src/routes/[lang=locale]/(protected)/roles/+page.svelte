<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Role from '$lib/shared/components/modules/roles/Role.svelte';
	import AddEditRoleModal from '$lib/shared/components/modules/roles/AddEditRoleModal.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import { superValidateSync } from 'sveltekit-superforms/client';
	import { roleSchema } from './schema.js';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';

	export let data;

	$: roles = data.roles.items ?? [];

	// Setup for Form --------------------------------------------------------------------------
	const getFormDataFromRoleData = (roleData: Role): { name: string } => {
		const { name } = roleData;
		return { name };
	};
	$: superFormData =
		modalState === 'add'
			? data.form
			: superValidateSync(getFormDataFromRoleData(roleData as Role), roleSchema($LL));

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let roleData: Role | null = null;

	const handleAction = (event: CustomEvent<{ action: 'edit' | 'delete'; role: Role }>) => {
		const { action, role } = event.detail;
		roleData = structuredClone(role);

		if (action === 'edit') {
			modalState = 'edit';
			openAddEditModal = true;
		} else {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			console.log('role to be deleted: ', roleData);
			openDeleteModal = false;
		}
	};
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
	<AddEditRoleModal
		bind:open={openAddEditModal}
		{modalState}
		{superFormData}
		entity={modalState === 'add'
			? $LL.modules.roles.entity.single()
			: formatEntityForModal({
					modalType: 'edit',
					entity: $LL.modules.roles.entity.single(),
					itemName: roleData?.name
			  })}
	/>
{/if}

{#if openDeleteModal}
	<DeleteModal
		bind:open={openDeleteModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.permissions.entity.single(),
			itemName: roleData?.name
		})}
		on:clickConfirmBtnTriggered={deleteItem}
	/>
{/if}
