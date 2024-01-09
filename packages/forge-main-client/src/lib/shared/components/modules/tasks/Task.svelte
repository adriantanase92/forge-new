<script lang="ts">
	import { colors, colorOptionsPerColor, TaskStatus, type TaskType } from '$lib/shared';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../general/button/Button.svelte';

	export let task: TaskType;

	const taskColorByStatus = (status: TaskStatus): string => {
		let colorClasses = '';
		if (status === TaskStatus.DONE) {
			colorClasses = `${colorOptionsPerColor.successAlt.backGround}`;
		} else if (status === TaskStatus.IN_PROGRESS) {
			colorClasses = `${colorOptionsPerColor.warningAlt.backGround}`;
		} else {
			colorClasses = `${colorOptionsPerColor.errorAlt.backGround}`;
		}

		return colorClasses;
	};

	const dispatch = createEventDispatcher();
	const onClickAction = ({ action, task }: { action: 'edit' | 'delete'; task: TaskType }) =>
		dispatch('clickActionTriggered', { action, task });
</script>

{#if task}
	<div
		class="py-2 px-4 rounded-xl flex justify-between items-center gap-8 {taskColorByStatus(
			task.status
		)}"
	>
		<div
			class="w-2/3 line-clamp-1 font-medium font-secondary {task.status === TaskStatus.DONE
				? 'line-through'
				: ''}"
			title={task.title}
		>
			{task.title}
		</div>
		<div class="w-1/3 flex items-center justify-between">
			<div class="w-1/2 font-bold uppercase">{task.status}</div>
			<div class="w-1/2 flex gap-2 justify-end items-center">
				<Button
					class="p-2"
					kind="icon"
					color="rhino"
					icon="pencil"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={() => onClickAction({ action: 'edit', task })}
				/>
				<Button
					class="p-2"
					kind="icon"
					color="error"
					icon="bin"
					iconHeight="18"
					iconWidth="18"
					iconColor={colors.white}
					on:click={() => onClickAction({ action: 'delete', task })}
				/>
			</div>
		</div>
	</div>
{/if}
