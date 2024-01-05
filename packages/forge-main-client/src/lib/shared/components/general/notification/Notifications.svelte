<script lang="ts">
	import { notifications } from '$stores/notifications';
</script>

<div class="fixed top-10 right-10 z-50">
	{#each $notifications as notification (notification.id)}
		<div
			class="bg-white border-l-4 p-4 mb-4 cursor-pointer transition-opacity duration-300 {notification.type ===
			'info'
				? 'border-blue-500'
				: ''} {notification.type === 'error' ? 'border-red-500' : ''}"
		>
			<button class="float-right" on:click={() => notifications.remove(notification.id)}
				>X</button
			>
			<p>{notification.message}</p>
		</div>
	{/each}
</div>
