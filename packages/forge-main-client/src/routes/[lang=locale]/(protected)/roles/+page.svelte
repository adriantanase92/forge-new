<script lang="ts">
	export let data;

	$: roles = data.roles;
	$: console.log('roles: ', roles);
</script>

{#each roles as role}
	{JSON.stringify(role)}
{/each}
