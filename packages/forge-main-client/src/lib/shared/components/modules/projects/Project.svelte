<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../../general/button/Button.svelte';
	import { colors, Modules, type Project } from '$lib/shared';
	import { goto } from '$app/navigation';

	export let project: Project;

	const dispatch = createEventDispatcher();
	const onClickAction = ({ project }: { project: Project }) =>
		dispatch('clickActionTriggered', { project });
	const viewProject = (project: Project) => goto(`/${Modules.PROJECTS}/${project._id as string}`);

	$: console.log('project: ', project);
</script>

{#if project}
	<div
		class="bg-gallery rounded-xl group p-4 shadow-sm border-2 border-solid border-transparent hover:border-cobalt flex flex-col gap-6"
	>
		<div class="flex justify-between items-center">
			<div>
				<h3 class="capitalize text-xl font-semibold group-hover:text-cobalt">
					{project.name}
				</h3>
				<span>{project.changeLog.createdAt}</span>
			</div>
			<div class="flex gap-2">
				<Button
					class="p-2"
					kind="icon"
					color="rhino"
					icon="eye-open"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={() => viewProject(project)}
				/>
				<Button
					class="p-2"
					kind="icon"
					color="error"
					icon="bin"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={(e) => onClickAction({ project })}
				/>
			</div>
		</div>

		{#if project.description}<div class="line-clamp-2">{project.description}</div>{/if}

		<div class="flex justify-between items-center"></div>
	</div>
{/if}
