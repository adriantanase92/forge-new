<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import LL from '$i18n/i18n-svelte';
	import {
		Modules,
		capitalize,
		colorOptionsPerColor,
		colors,
		type ProjectType,
		deleteOne,
		type TaskType,
		type UserType,
		type EditTaskType
	} from '$lib/shared/index.js';
	import ProfileImage from '$lib/shared/components/general/profile-image/ProfileImage.svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import type { ModalState } from '$lib/shared/components/general/modal/types.js';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { notifications } from '$stores/notifications.js';
	import { goto, invalidateAll } from '$app/navigation';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';
	import { projectSchema } from '../schema.js';
	import AddEditProjectModal from '$lib/shared/components/modules/projects/AddEditProjectModal.svelte';
	import Task from '$lib/shared/components/modules/tasks/Task.svelte';
	import AddEditTaskModal from '$lib/shared/components/modules/tasks/AddEditTaskModal.svelte';
	import { taskSchema } from './schema.js';

	export let data;

	$: users =
		data.users.items.map((user: UserType) => ({
			role: user.role,
			id: user._id,
			name: `${user.firstName} ${user.lastName}`
		})) ?? [];
	$: project = data.project;
	$: checkProjectTasks = project.tasks && project.tasks.length > 0;

	// Setup for Form --------------------------------------------------------------------------
	const getFormDataFromTaskData = (taskData: TaskType): EditTaskType => {
		const { _id: id, ...rest } = taskData;
		return { ...rest, id };
	};
	let taskDataForEditForm: EditTaskType;

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteTaskModal: boolean = false;
	let openDeleteProjectModal: boolean = false;
	let openEditProjectModal: boolean = false;
	let openAddEditTaskModal: boolean = false;
	let taskModalState: ModalState = 'add';
	let taskData: TaskType | null = null;

	const getFormDataFromProjectData = (projectData: ProjectType) => {
		const clients = (projectData.clients as UserType[]).map((client) => client._id);
		const workers = (projectData.workers as UserType[]).map((worker) => worker._id);
		const manager = projectData.manager._id;
		const { _id: id, name, description } = projectData;
		return { id, name, description, clients, workers, manager };
	};

	const handleTaskAction = (
		event: CustomEvent<{ action: 'edit' | 'delete'; task: TaskType }>
	) => {
		const { action, task } = event.detail;
		taskData = structuredClone(task);

		if (action === 'edit') {
			taskModalState = 'edit';
			taskDataForEditForm = getFormDataFromTaskData(taskData as TaskType);
			openAddEditTaskModal = true;
		} else {
			openDeleteTaskModal = true;
		}
	};

	// Setup for Delete Actions -----------------------------------------------------------------
	const deleteProjectItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
				errorKey: $LL.errors.errorFetchingSomethingFromServer({
					something: $LL.modules.projects.entity.single()
				}),
				id: project._id
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.projects.entity.single()}</span>`
					})
				);
				invalidateAll();
				openDeleteProjectModal = false;
				goto(`/${Modules.PROJECTS}`);
			}
		}
	};

	const deleteTaskItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { _id: id } = taskData as TaskType;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
				errorKey: $LL.errors.errorFetchingSomethingFromServer({
					something: $LL.modules.tasks.entity.single()
				}),
				id
			});
			if (response.data.messageKey === 'item_deleted_successfully') {
				notifications.success(
					$LL.notifications.somethingDeletedSuccessfully({
						something: `<span class="capitalize mr-2">${$LL.modules.tasks.entity.single()}</span>`
					})
				);
				invalidateAll();
				openDeleteTaskModal = false;
			}
		}
	};
</script>

{#if project}
	<Box>
		<div class="flex flex-col sm:flex-row gap-6">
			<div class="w-full sm:w-1/3">
				<div class="mb-6 flex justify-between items-center gap-2">
					<h2 class="text-2xl font-secondary font-medium">
						{capitalize($LL.modules.projects.entity.single())}: {project.name}
					</h2>

					<div>
						<Button
							class="p-2"
							kind="icon"
							color="cobalt"
							icon="pencil"
							iconHeight="18"
							iconWidth="18"
							iconColor={colors.white}
							on:click={() => (openEditProjectModal = !openEditProjectModal)}
						/>
						<Button
							class="p-2"
							kind="icon"
							color="error"
							icon="bin"
							iconHeight="18"
							iconWidth="18"
							iconColor={colors.white}
							on:click={(e) => (openDeleteProjectModal = !openDeleteProjectModal)}
						/>
					</div>
				</div>

				{#if project.description}
					<div class="mb-8">
						<h3 class="capitalize mb-1 text-slate-500 font-secondary font-medium">
							{$LL.fields.description.text()}
						</h3>
						<p class="text-slate-400">{project.description}</p>
					</div>
				{/if}

				<div class="flex flex-col gap-4">
					{#if project.clients && project.clients.length > 0}
						<div
							class="flex items-center gap-4 py-2 px-4 rounded-xl {colorOptionsPerColor
								.curious.backGround}"
						>
							<h3 class="capitalize font-secondary font-medium text-white">
								{$LL.modules.users.types.client.multiple()}:
							</h3>
							<div class="flex items-center gap-2">
								{#each project.workers as worker}
									<div class="flex items-center gap-2">
										<ProfileImage
											firstName={worker.firstName}
											lastName={worker.lastName}
										/>
										<span class="text-white">
											{worker.firstName}
											{worker.lastName}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					{#if project.manager}
						<div
							class="flex items-center gap-4 py-2 px-4 rounded-xl {colorOptionsPerColor
								.eucalyptus.backGround}"
						>
							<h3 class="capitalize font-secondary font-medium text-white">
								{$LL.modules.users.types.manager.single()}:
							</h3>
							<div class="flex items-center gap-2">
								<ProfileImage
									firstName={project.manager.firstName}
									lastName={project.manager.lastName}
								/>
								<span class="text-white"
									>{project.manager.firstName} {project.manager.lastName}</span
								>
							</div>
						</div>
					{/if}

					{#if project.workers && project.workers.length > 0}
						<div
							class="flex items-center gap-4 py-2 px-4 rounded-xl {colorOptionsPerColor
								.warning.backGround}"
						>
							<h3 class="capitalize font-secondary font-medium text-white">
								{$LL.modules.users.types.worker.multiple()}:
							</h3>
							<div class="flex items-center gap-4">
								{#each project.clients as client}
									<div class="flex items-center gap-2">
										<ProfileImage
											firstName={client.firstName}
											lastName={client.lastName}
										/>
										<span class="text-white">
											{client.firstName}
											{client.lastName}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>

			<div class="w-full sm:w-2/3">
				<div class="border border-solid border-slate-400 rounded-lg p-4">
					<div class="mb-6 flex justify-between items-center gap-2">
						<h3 class="text-xl font-secondary font-medium">
							{capitalize($LL.modules.tasks.entity.multiple())}
						</h3>

						<Button
							class="py-2 px-4"
							kind="fill"
							color="cobalt"
							icon="plus"
							iconHeight="24"
							iconWidth="24"
							iconColor={colors.white}
							on:click={() => (openAddEditTaskModal = !openAddEditTaskModal)}
						>
							{$LL.buttonsOrLinks.addSomething({
								something: $LL.modules.tasks.entity.single()
							})}
						</Button>
					</div>
					{#if checkProjectTasks}
						<div class="flex flex-col gap-2">
							{#each project.tasks as task}
								<Task {task} on:clickActionTriggered={handleTaskAction} />
							{/each}
						</div>
					{:else}
						<p>
							{$LL.errors.noSomethingFound({
								something: $LL.modules.tasks.entity.multiple()
							})}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</Box>
{/if}

{#if openEditProjectModal}
	<AddEditProjectModal
		bind:open={openEditProjectModal}
		modalState="edit"
		{users}
		dataForEditForm={getFormDataFromProjectData(project)}
		schema={projectSchema($LL)}
		entity={formatEntityForModal({
			modalType: 'edit',
			entity: $LL.modules.projects.entity.single(),
			itemName: `${project.name}`
		})}
	/>
{/if}

{#if openDeleteProjectModal}
	<DeleteModal
		bind:open={openDeleteProjectModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.projects.entity.single(),
			itemName: `${project.name}`
		})}
		on:clickConfirmBtnTriggered={deleteProjectItem}
	/>
{/if}

{#if openAddEditTaskModal}
	<AddEditTaskModal
		bind:open={openAddEditTaskModal}
		modalState={taskModalState}
		dataForEditForm={taskDataForEditForm}
		schema={taskSchema($LL)}
		entity={taskModalState === 'add'
			? $LL.modules.tasks.entity.single()
			: formatEntityForModal({
					modalType: 'edit',
					entity: $LL.modules.tasks.entity.single(),
					itemName: `${taskData?.title}`
			  })}
	/>
{/if}

{#if openDeleteTaskModal}
	<DeleteModal
		bind:open={openDeleteTaskModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.tasks.entity.single(),
			itemName: ''
		})}
		on:clickConfirmBtnTriggered={deleteTaskItem}
	/>
{/if}
