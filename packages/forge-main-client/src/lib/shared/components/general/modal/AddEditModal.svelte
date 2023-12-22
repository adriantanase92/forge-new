<script lang="ts">
	import Modal from './Modal.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { ModalState } from './types';

	export let open = false;
	export let modalState: ModalState = 'add';
	export let entity: string = 'item';

	$: title =
		modalState === 'add'
			? $LL.buttonsOrLinks.addSomething({ something: entity })
			: $LL.buttonsOrLinks.editSomething({ something: entity });
</script>

<Modal noFooter size="md" bind:open {title}>
	<slot />
</Modal>
