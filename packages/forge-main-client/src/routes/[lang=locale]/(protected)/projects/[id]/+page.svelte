<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import LL from '$i18n/i18n-svelte';

	export let data;

	$: project = data.project;
	$: console.log('project: ', project);
</script>

{#if project}
	<Box>
		<h1 class="text-2xl font-secondary font-medium mb-6">Project: {project.name}</h1>

		{JSON.stringify(project)}
	</Box>
{/if}
