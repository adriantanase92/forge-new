<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	const status = $page.status;
	const message = $page.error?.message;
	const stack = ($page.error as Error | undefined)?.stack ?? '';
</script>

<h1 style:margin-bottom="1rem">{status}: {message}</h1>
{#if dev}
	{stack}
{/if}
