<script lang="ts">
	import { colors, type Permission } from '$lib/shared';
	import Button from '../../general/button/Button.svelte';
	import Modal from '../../general/modal/Modal.svelte';

	export let permission: Permission;

	let openEditPermissionModal: boolean = false;
</script>

{#if permission}
	<div
		class="bg-gallery rounded-xl group p-6 shadow-sm border border-rhino hover:border-cobalt border-solid flex justify-between items-center"
	>
		<div class="capitalize text-xl font-semibold group-hover:text-cobalt">
			{permission.name}
		</div>
		<div class="flex gap-2">
			<Button
				class="p-2"
				kind="icon"
				color="rhino"
				icon="pencil"
				iconHeight="18"
				iconWidth="18"
				iconColor={colors.white}
				on:click={() => (openEditPermissionModal = true)}
			/>
			<Button
				class="p-2"
				kind="icon"
				color="error"
				icon="bin"
				iconHeight="18"
				iconWidth="18"
				iconColor={colors.white}
				on:click={() => console.log(`delete permission ${permission.id}`)}
			/>
		</div>
	</div>
{/if}

{#if openEditPermissionModal}
	<Modal
		noFooter
		size="md"
		bind:open={openEditPermissionModal}
		title={'asta e titlul'}
		class="overflow-y-auto"
		modalHeaderClasses="flex justify-between items-center shrink-0 max-h-[64px] mb-6"
		modalTitleClasses="text-3xl font-primary-semibold text-yoboo-rhino"
		modalContainerClasses="flex flex-col p-8"
		modalBodyClasses="grow"
	>
		sadadad
	</Modal>
{/if}
