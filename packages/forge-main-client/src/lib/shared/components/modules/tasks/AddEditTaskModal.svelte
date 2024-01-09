<script lang="ts">
	import {
		createOne,
		Modules,
		type EditTaskType,
		type NewTaskType,
		updateOne,
		type TaskType,
		textValidator,
		capitalize,
		TaskStatus
	} from '$lib/shared';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import type { ModalState } from '../../general/modal/types';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import LL from '$i18n/i18n-svelte';
	import { notifications } from '$stores/notifications';
	import AddEditModal from '../../general/modal/AddEditModal.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Input from '../../general/form/Input.svelte';
	import Button from '../../general/button/Button.svelte';
	import FormError from '../../general/form/FormError.svelte';
	import FieldError from '../../general/form/FieldError.svelte';
	import Textarea from '../../general/form/Textarea.svelte';
	import Select from '../../general/form/Select.svelte';
	import type { SelectOptionType } from '../../general/form/types';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';
	export let schema;
	export let dataForEditForm: EditTaskType | null = null;

	const statuses: SelectOptionType[] = Object.values(TaskStatus).map((item) => ({
		text: capitalize(item.replace('-', ' ')),
		value: item
	}));

	const taskData = open && modalState === 'edit' ? dataForEditForm : null;

	const form = superForm(superValidateSync(taskData, schema), {
		SPA: true,
		dataType: 'json',
		onUpdate: async ({ form }) => {
			if (form.valid) {
				if (!form.data.id) {
					const response = await createOne<NewTaskType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
						errorKey: $LL.errors.errorFetchingSomethingFromServer({
							something: $LL.modules.tasks.entity.single()
						}),
						data: {}
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingAddedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.tasks.entity.single()}</span>`
							})
						);
					}
				} else {
					const response = await updateOne<TaskType>({
						apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
						errorKey: $LL.errors.errorFetchingSomethingFromServer({
							something: $LL.modules.tasks.entity.single()
						}),
						id: form.data.id,
						data: {}
					});
					if (!response.error) {
						notifications.success(
							$LL.notifications.somethingEditedSuccessfully({
								something: `<span class="capitalize mr-2">${$LL.modules.tasks.entity.single()}</span>`
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
	<AddEditModal bind:open size="lg" {modalState} {entity}>
		<form id="addEditForm" method="POST" use:enhance>
			{#if $formData.id}
				<Input {form} field="id" type="hidden" id="id" class="hidden" />
			{/if}

			<div class="flex flex-col gap-6">
				<SuperDebug data={$formData} />

				<div>
					<Textarea
						aria-invalid={$errors.title ? 'true' : undefined}
						placeholder={capitalize($LL.fields.title.text())}
						{form}
						field="title"
						id="title"
						class=""
					/>
					<FieldError errors={$errors.title} />
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
						options={statuses}
						withEmptyOption
						{form}
						field="status"
						id="status"
						class=""
					/>
					<FieldError errors={$errors.status} />
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
								something: $LL.modules.tasks.entity.single()
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
