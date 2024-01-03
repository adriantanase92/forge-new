<script lang="ts">
	import Table from '$lib/shared/components/general/table/Table.svelte';
	import type {
		TableAction,
		TableItem,
		TableOnClickDispatcherEvent
	} from '$lib/shared/components/general/table/types.js';
	import LL from '$i18n/i18n-svelte';
	import PageTitle from '$lib/shared/components/panel/PageTitle.svelte';
	import Box from '$lib/shared/components/panel/Box.svelte';
	import {
		capitalize,
		colors,
		deleteOne,
		Modules,
		UserRole,
		type User,
		formatObjectFromTable,
		getAll
	} from '$lib/shared/index.js';
	import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
	import { goto, invalidateAll } from '$app/navigation';
	import DeleteModal from '$lib/shared/components/general/modal/DeleteModal.svelte';
	import { formatEntityForModal } from '$lib/shared/components/general/modal/utils.js';

	export let data;

	// Setup for Table ------------------------------------------------------------------------
	const noDataFoundMessage = $LL.errors.noSomethingFound({
		something: $LL.modules.users.entity.multiple()
	});

	const headers = [
		{ key: 'firstName', text: capitalize($LL.fields.firstName.text()) },
		{ key: 'lastName', text: capitalize($LL.fields.lastName.text()) },
		{ key: 'role', text: capitalize($LL.fields.role.text()) },
		{ key: 'email', text: capitalize($LL.fields.email.text()) },
		{ key: 'phone', text: capitalize($LL.fields.phone.text()) }
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
		},
		{
			type: 'button',
			btnActionName: 'delete',
			icon: {
				name: 'bin',
				width: '18',
				height: '18',
				color: colors.white
			},
			buttonColor: 'error',
			class: 'rounded-lg py-1 px-2'
		}
	];

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
					value: item._id
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
					value: item.phone ?? '/'
				}
			};
		});
	};

	$: items =
		data.users.items && data.users.items.length > 0
			? formatItemsForTable(data.users.items)
			: [];
	$: totalItems = data.users.pagination.totalItems ?? 10;
	$: currentPage = data.users.pagination.page ?? 1;

	let pagination: { page: number; limit?: number };
	$: pagination = { page: currentPage };

	let searchValue: string = '';

	const handleTableData = async (
		event: CustomEvent<{ search: string; pagination: { page: number; limit?: number } }>
	) => {
		console.log('event.detail.search: ', event.detail.search);
		if (event.detail.search !== undefined) {
			searchValue = event.detail.search;
		}

		if (event.detail.pagination) {
			pagination = structuredClone(event.detail.pagination);
		}

		const response = await getAll({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
			requestQuery: {
				search: searchValue,
				page: pagination.page.toString(),
				...(pagination.limit ? { limit: pagination.limit.toString() } : {})
			},
			errorKey: $LL.errors.errorFetchingSomethingFromServer({
				something: $LL.modules.users.entity.multiple()
			})
		});

		items =
			response.data.items && response.data.items.length > 0
				? formatItemsForTable(response.data.items)
				: [];
		totalItems = response.data.pagination.totalItems ?? 10;
		currentPage = response.data.pagination.page ?? 1;
	};

	// Setup for Modals ------------------------------------------------------------------------
	let openDeleteModal: boolean = false;
	let userData: User | null = null;

	const handleAction = (event: CustomEvent<TableOnClickDispatcherEvent>) => {
		const { data, actionName } = event.detail;
		userData = formatObjectFromTable(structuredClone(data)) as User;

		if (actionName === 'edit') {
			goto(`/${Modules.USERS}/${userData.id}`);
		}

		if (actionName === 'delete') {
			openDeleteModal = true;
		}
	};

	// Setup for Delete Action -----------------------------------------------------------------
	const deleteItem = async (event: CustomEvent<{ confirm: boolean }>) => {
		const { confirm } = event.detail;

		if (confirm) {
			const { id } = userData as User;
			const response = await deleteOne({
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
				errorKey: $LL.errors.errorFetchingSomethingFromServer({
					something: $LL.modules.users.entity.single()
				}),
				id
			});
			// TODO: don't forget about notification here
			console.log('delete response: ', response);
			invalidateAll();
			openDeleteModal = false;
		}
	};
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
		{totalItems}
		{currentPage}
		on:clickAction={handleAction}
		on:searchBy={handleTableData}
		on:changePage={handleTableData}
	>
		<PageTitle slot="title" text={capitalize($LL.modules.users.entity.multiple())} />
		<div slot="actions"></div>
	</Table>
</Box>

{#if openDeleteModal}
	<DeleteModal
		bind:open={openDeleteModal}
		entity={formatEntityForModal({
			modalType: 'delete',
			entity: $LL.modules.users.entity.single(),
			itemName: `${userData?.firstName} ${userData?.lastName}`
		})}
		on:clickConfirmBtnTriggered={deleteItem}
	/>
{/if}
