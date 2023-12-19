<script lang="ts">
	export let data;

	$: permissions = data.permissions;
	$: console.log('permissions: ', permissions);
</script>

{#each permissions as permission}
	{JSON.stringify(permission)}
{/each}
