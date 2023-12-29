<script lang="ts">
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import type { ModalState } from '../../general/modal/types';
	import { textValidator, capitalize } from '$lib/shared';
	import { superForm } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import type { AnyZodObject } from 'zod';
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let superFormData: SuperValidated<ZodValidation<AnyZodObject>, any>;
	export let entity: string = 'item';

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

	console.log('superFormData from within: ', superFormData);
</script>

<AddEditModal bind:open {modalState} {entity}>
	<form id="addEditForm" method="POST" use:enhance>
		{#if $formData.id}
			<Input {form} field="id" type="hidden" id="id" class="hidden" />
		{/if}

		<div class="flex flex-col gap-6">
			<SuperDebug data={$formData} />

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
							something: $LL.modules.permissions.entity.single()
						})}
					{:else}
						{$LL.buttonsOrLinks.confirm()}
					{/if}
				</Button>
			</div>
		</div>
	</form>
</AddEditModal>
