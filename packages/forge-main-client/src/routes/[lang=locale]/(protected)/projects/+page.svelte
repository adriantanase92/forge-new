<script lang="ts">
	export let data;

	$: projects = data.projects;
	$: console.log('projects: ', projects);
</script>

{#each projects as project}
	{JSON.stringify(project)}
{/each}
