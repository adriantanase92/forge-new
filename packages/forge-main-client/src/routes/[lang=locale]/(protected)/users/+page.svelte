<script lang="ts">
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Table from '$lib/shared/components/general/table/Table.svelte';
	import type {
		TableAction,
		TableItem,
		TableOnClickDispatcherEvent
	} from '$lib/shared/components/general/table/types.js';
	import LL from '$i18n/i18n-svelte';
	import PageTitle from '$lib/shared/components/page-title/PageTitle.svelte';

	export let data;

	// Setup for Table ------------------------------------------------------------------------
	const noDataFoundMessage = $LL.errors.no_entity_found({
		entity: $LL.pages.users.entity()
	});

	const headers = [
		{ key: 'email', text: 'fsdfs' },
		{ key: 'firstName', text: 'sdfsfs' },
		{ key: 'lastName', text: 'sdfsfs' },
		{ key: 'phone', text: 'sdfsf' }
	];

	const actions: TableAction[] = [
		{
			type: 'button',
			btnActionName: 'edit',
			icon: {
				name: 'pencil',
				width: '24',
				height: '24'
			},
			buttonColor: 'gallery',
			class: 'rounded-lg p-1'
		}
	];

	const handleAction = (event: CustomEvent<TableOnClickDispatcherEvent>) => {
		const { data, actionName } = event.detail;

		// if (actionName === 'edit') {
		// }
	};

	const formatItemsForTable = (unformattedTableItems: any[]): TableItem[] => {
		return unformattedTableItems.map((item) => {
			return {
				id: {
					value: item.id
				},
				email: {
					value: item.email
				},
				firstName: {
					value: item.firstName
				},
				lastName: {
					value: item.lastName
				},
				phone: {
					value: item.phone
				}
			};
		});
	};

	$: items = data.users && data.users.length > 0 ? formatItemsForTable(data.users) : [];
	$: console.log('items: ', items);
</script>

<Table
	{headers}
	{items}
	{actions}
	{noDataFoundMessage}
	striped
	withPagination
	withSearch
	on:clickActionTriggered={handleAction}
>
	<PageTitle slot="title" text={$LL.pages.users.entity()} />
	<div slot="actions"></div>
</Table>
