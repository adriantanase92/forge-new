<script lang="ts">
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import type { ModalState } from '../../general/modal/types';
	import { textValidator, capitalize, Modules, createOne, type Project } from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let schema;

	const form = superForm(superValidateSync(null, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				const response = await createOne<Project>({
					apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
					errorKey: $LL.errors.errorFetchingSomethingFromServer({
						something: $LL.modules.projects.entity.single()
					}),
					data: { name: form.data.name }
				});
				// TODO: don't forget about notification here
				console.log('add response: ', response);
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
		<form id="addForm" method="POST" use:enhance>
			<div class="flex flex-col gap-6">
				<SuperDebug data={$formData} />

				<div>
					<Input
						aria-invalid={$errors.name ? 'true' : undefined}
						placeholder={capitalize(
							`${$LL.modules.projects.entity.single()} ${$LL.fields.name.text()}`
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
						form="addForm"
						disabled={$delayed}
						delayed={$delayed}
					>
						{#if modalState === 'add'}
							{$LL.buttonsOrLinks.addSomething({
								something: $LL.modules.projects.entity.single()
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
