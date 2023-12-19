<script lang="ts">
	export let data;

	$: tasks = data.tasks;
	$: console.log('tasks: ', tasks);
</script>

{#each tasks as task}
	{JSON.stringify(task)}
{/each}
