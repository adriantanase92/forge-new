<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Permission from '$lib/shared/components/modules/permissions/Permission.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import { superValidateSync } from 'sveltekit-superforms/client';
	import { permissionSchema } from './schema.js';
	import AddEditPermissionModal from '$lib/shared/components/modules/permissions/AddEditPermissionModal.svelte';

	export let data;

	$: permissions = data.permissions ?? [];

	// Setup for Form --------------------------------------------------------------------------
	const getFormDataFromPermissionData = (permissionData: Permission): { name: string } => {
		const { name } = permissionData;
		return { name };
	};
	$: superFormData =
		modalState === 'add'
			? data.form
			: superValidateSync(
					getFormDataFromPermissionData(permissionData as Permission),
					permissionSchema($LL)
			  );

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let openAddEditModal: boolean = false;
	let modalState: ModalState = 'add';
	let permissionData: Permission | null = null;

	const handleAction = (
		event: CustomEvent<{ action: 'edit' | 'delete'; permission: Permission }>
	) => {
		const { action, permission } = event.detail;
		if (action === 'edit') {
			permissionData = structuredClone(permission);
			modalState = 'edit';
			openAddEditModal = true;
		} else {
			permissionData = structuredClone(permission);
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			console.log('permission to be deleted: ', permissionData);
			openDeleteModal = false;
		}
	};
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
	<AddEditPermissionModal
		bind:open={openAddEditModal}
		{modalState}
		{superFormData}
		entity={modalState === 'add'
			? $LL.modules.permissions.entity.single()
			: formatEntityForModal({
					modalType: 'edit',
					entity: $LL.modules.permissions.entity.single(),
					itemName: permissionData?.name
			  })}
	/>
{/if}

{#if openDeleteModal}
	<DeleteModal
		bind:open={openDeleteModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.permissions.entity.single(),
			itemName: permissionData?.name
		})}
		on:clickConfirmBtnTriggered={deleteItem}
	/>
{/if}
