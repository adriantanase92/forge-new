<script lang="ts">
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import type { ModalState } from '../../general/modal/types';
	import {
		textValidator,
		capitalize,
		type RoleType,
		createOne,
		Modules,
		updateOne,
		type EditRoleType,
		type NewRoleType
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { notifications } from '$stores/notifications';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let dataForEditForm: EditRoleType;
	export let schema;

	const roleData = open && modalState === 'edit' ? dataForEditForm : null;

	const form = superForm(superValidateSync(roleData, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				if (!form.data.id) {
					const response = await createOne<NewRoleType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
						errorKey: $LL.errors.errorFetchingSomethingFromServer({
							something: $LL.modules.roles.entity.single()
						}),
						data: { name: form.data.name }
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingAddedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.roles.entity.single()}</span>`
							})
						);
					}
				} else {
					const response = await updateOne<RoleType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
						errorKey: $LL.errors.errorFetchingSomethingFromServer({
							something: $LL.modules.roles.entity.single()
						}),
						id: form.data.id,
						data: { name: form.data.name }
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingEditedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.roles.entity.single()}</span>`
							})
						);
					}
				}
				open = false;
			}
		},
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
		stickyNavbar: '#main-header',
		resetForm: true
	});
	const { form: formData, errors, enhance, delayed, message } = form;
</script>

{#if open}
	<AddEditModal bind:open {modalState} {entity}>
		<form id="addEditForm" method="POST" use:enhance>
			{#if $formData.id}
				<Input {form} field="id" type="hidden" id="id" class="hidden" />
			{/if}

			<div class="flex flex-col gap-6">
				<div>
					<Input
						aria-invalid={$errors.name ? 'true' : undefined}
						placeholder={capitalize(
							`${$LL.modules.roles.entity.single()} ${$LL.fields.name.text()}`
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
						on:click={() => (open = false)}>{$LL.buttonsOrLinks.cancel()}</Button
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
								something: $LL.modules.roles.entity.single()
							})}
						{:else}
							{$LL.buttonsOrLinks.confirm()}
						{/if}
					</Button>
				</div>
			</div>
		</form>
	</AddEditModal>
{/if}
