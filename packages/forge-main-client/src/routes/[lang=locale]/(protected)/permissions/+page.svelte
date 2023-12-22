<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import DynamicDataRenderer from '$lib/shared/components/general/dynamic-data-renderer/DynamicDataRenderer.svelte';
	import { capitalize, colors, textValidator } from '$lib/shared/index.js';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Permission from '$lib/shared/components/modules/permissions/Permission.svelte';
	import AddEditModal from '$lib/shared/components/general/modal/AddEditModal.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import { permissionSchema } from './schema.js';

	export let data;

	$: permissions = data.permissions ?? [];

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

	const form = superForm(superFormData, {
		validators: {
			name: (name) =>
				textValidator({
					value: name,
					fieldName: 'name',
					minCharacters: 2,
					maxCharacters: 60,
					t: $LL
				})
		},
		errorSelector: '[aria-invalid="true"]',
		scrollToError: 'smooth',
		autoFocusOnError: 'detect',
		stickyNavbar: '#main-header'
	});
	const { form: formData, errors, enhance, delayed, message } = form;

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
	<AddEditModal
		bind:open={openAddEditModal}
		{modalState}
		entity={modalState === 'add'
			? $LL.modules.permissions.entity.single()
			: formatEntityForModal({
					modalType: 'edit',
					entity: $LL.modules.permissions.entity.single(),
					itemName: permissionData?.name
			  })}
	>
		<form id="addEditForm" method="POST" use:enhance class="flex flex-col gap-6">
			<div>
				<Input
					aria-invalid={$errors.name ? 'true' : undefined}
					placeholder={capitalize(
						`${$LL.modules.permissions.entity.single()} ${$LL.fields.name.text()}`
					)}
					{form}
					field="name"
					type="text"
					id="name"
					class=""
				/>
				<FieldError errors={$errors.name} />
			</div>

			{#if $message !== undefined && $message.status === 'error'}
				<FormError errorMessage={$message.text} />
			{/if}

			<div class="flex items-center justify-between">
				<Button
					color="rhino"
					class="px-4 py-2"
					kind="outline"
					on:click={() => (openAddEditModal = false)}
					>{$LL.buttonsOrLinks.cancel()}</Button
				>

				<Button
					kind="fill"
					color="curious"
					class="inline-flex items-center justify-center gap-2 px-4 py-2.5"
					type="submit"
					form="addEditForm"
					disabled={$delayed}
					delayed={$delayed}
				>
					{#if modalState === 'add'}
						{$LL.buttonsOrLinks.addSomething({
							something: $LL.modules.permissions.entity.single()
						})}
					{:else}
						{$LL.buttonsOrLinks.confirm()}
					{/if}
				</Button>
			</div>
		</form>
	</AddEditModal>
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
