<script lang="ts">
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import Table from '$lib/shared/components/general/table/Table.svelte';
	import type {
		TableAction,
		TableItem,
		TableOnClickDispatcherEvent
	} from '$lib/shared/components/general/table/types.js';
	import LL from '$i18n/i18n-svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import { capitalize, UserRole } from '$lib/shared/index.js';

	export let data;

	// Setup for Table ------------------------------------------------------------------------
	const noDataFoundMessage = $LL.errors.noSomethingFound({
		something: $LL.modules.users.entity.multiple()
	});

	const headers = [
		{ key: 'firstName', text: 'sdfsfs' },
		{ key: 'lastName', text: 'sdfsfs' },
		{ key: 'role', text: 'fsdfs' },
		{ key: 'email', text: 'fsdfs' },
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

	const getColorForUserRole = (role: UserRole) => {
		let color: string = 'text-rhino';

		if (role === UserRole.ADMIN) {
			color = 'text-error';
		} else if (role === UserRole.CLIENT) {
			color = 'text-curious';
		} else if (role === UserRole.MANAGER) {
			color = 'text-warning';
		}

		return color;
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
				role: {
					value: item.role,
					stylingClasses: `${getColorForUserRole(item.role)} font-secondary font-medium`
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

<Box>
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
		<PageTitle slot="title" text={capitalize($LL.modules.users.entity.multiple())} />
		<div slot="actions"></div>
	</Table>
</Box>
