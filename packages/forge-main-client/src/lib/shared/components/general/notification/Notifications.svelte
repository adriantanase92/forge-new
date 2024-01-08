<script lang="ts">
	import { notifications } from '$stores/notifications';
	import Notification from './Notification.svelte';
</script>

<div class="fixed top-10 right-10 z-50">
	{#each $notifications as notification (notification.id)}
		<Notification
			id={notification.id}
			type={notification.type}
			message={notification.message}
		/>
	{/each}
</div>
