<script lang="ts">
	export let text: string = 'Title';
</script>

<h2 class="font-primary font-semibold block text-2xl {$$restProps.class ? $$restProps.class : ''}">
	{text}
</h2>
