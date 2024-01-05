<script lang="ts">
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import type { ModalState } from '../../general/modal/types';
	import {
		textValidator,
		capitalize,
		Modules,
		createOne,
		type NewProjectType
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '../../general/button/Button.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import Textarea from '../../general/form/Textarea.svelte';
	import Select from '../../general/form/Select.svelte';
	import type { SelectOptionType } from '../../general/form/types';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let schema;

	const form = superForm(superValidateSync(null, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				const response = await createOne<NewProjectType>({
					apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
					errorKey: $LL.errors.errorFetchingSomethingFromServer({
						something: $LL.modules.projects.entity.single()
					}),
					data: {
						name: form.data.name,
						...(form.data.description ? { description: form.data.description } : {}),
						manager: form.data.manager,
						...(form.data.clients && form.data.clients.length > 0
							? { clients: form.data.clients }
							: {}),
						...(form.data.workers && form.data.workers.length > 0
							? { workers: form.data.workers }
							: {})
					}
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

	const managers: SelectOptionType[] = [];
	const clients: SelectOptionType[] = [];
	const workers: SelectOptionType[] = [];
</script>

{#if open}
	<AddEditModal bind:open size="lg" {modalState} {entity}>
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

				<div>
					<Textarea
						aria-invalid={$errors.description ? 'true' : undefined}
						placeholder={capitalize($LL.fields.description.text())}
						{form}
						field="description"
						id="description"
						class=""
					/>
					<FieldError errors={$errors.description} />
				</div>

				<div>
					<Select
						label={capitalize($LL.modules.users.types.manager.single())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={managers}
						{form}
						field="manager"
						id="manager"
						class=""
					/>
					<FieldError errors={$errors.manager} />
				</div>

				<div>
					<Select
						label={capitalize($LL.modules.users.types.client.multiple())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={clients}
						{form}
						field="clients"
						id="clients"
						class=""
					/>
					<FieldError errors={$errors.clients} />
				</div>

				<div>
					<Select
						label={capitalize($LL.modules.users.types.worker.multiple())}
						aria-invalid={$errors.name ? 'true' : undefined}
						options={workers}
						{form}
						field="workers"
						type="text"
						id="workers"
						class=""
					/>
					<FieldError errors={$errors.workers} />
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
