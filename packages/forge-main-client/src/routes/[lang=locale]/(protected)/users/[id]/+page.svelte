<script lang="ts">
	import Box from '$lib/shared/components/panel/Box.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalize, type Address } from '$lib/shared/index.js';
	import userCoverAsset from '$assets/user-cover.jpg';

	export let data;

	$: user = data.user;
	$: console.log('user: ', user);

	const getAddressString = (address: Address): string => {
		// Filter the entries of the address object to keep only those with defined values
		const definedEntries = Object.entries(address).filter(
			([key, value]) => value !== undefined
		);

		// Map the entries to their string representation and join them
		const addressParts = definedEntries.map(([key, value]) => `${key}: ${value}`);
		return addressParts.join(', ');
	};
</script>

{#if user}
	<Box>
		<div class="flex flex-col gap-6">
			<div class="bg-white rounded-xl shadow-lg shadow-gray-100/10 overflow-hidden">
				<!-- cover -->
				<div class="overflow-hidden">
					<div class="group h-36 overflow-hidden relative">
						<!-- TODO: converteste asta in webp si scapa de warning -->
						<img src={userCoverAsset} alt="cover image" class="w-full" />
					</div>

					<div class="flex justify-center -mt-10 relative">
						<!-- TODO: foloseste svg aici ceva -->
						<!-- <img
							src="../src/img/avatar.png"
							alt="avatar"
							class="rounded-full w-24 h-24 bg-primary-600 text-white dark:bg-primary-200 dark:text-neutral-900 border-solid border-white border-2 -mt-3"
						/> -->
					</div>
					<div class="text-center px-4 pb-6 pt-2">
						<h3 class="text-title-lg text-gray-900 mb-1">
							{user.role}
						</h3>
					</div>
				</div>
				<!-- information -->
				<div class="text-body-md flex flex-col gap-1 px-6 pb-6">
					<p>
						<strong>Full Name :</strong><span class="ml-2"
							>{user.firstName} {user.lastName}</span
						>
					</p>
					{#if user.phone}<p>
							<strong>Phone :</strong><span class="ml-2">{user.phone}</span>
						</p>{/if}
					<p><strong>Email :</strong><span class="ml-2">{user.email}</span></p>
					<p>
						<strong>Preferred Language :</strong><span class="ml-2">
							{user.preferredLanguage}</span
						>
					</p>
					{#if user.address}
						<p>
							<strong>Address :</strong><span class="ml-2">
								{getAddressString(user.address)}</span
							>
						</p>
					{/if}
				</div>
			</div>

			{#if user.permissions}
				<h3 class="text-2xl font-secondary font-semibold">
					{capitalize($LL.modules.permissions.entity.multiple())}
				</h3>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>read</th>
							<th>write</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(user.permissions) as [permissionName, permissionOptions]}
							<tr>
								<td>
									<h4 class="text-xl font-secondary font-medium capitalize">
										{permissionName}
									</h4>
								</td>
								<td>
									<label
										for="{permissionName}-read"
										class="flex gap-2 items-center"
									>
										<input
											id="{permissionName}-read"
											name={permissionName}
											type="checkbox"
											value={permissionOptions.read}
										/>
										read
									</label>
								</td>
								<td>
									<label
										for="{permissionName}-write"
										class="flex gap-2 items-center"
									>
										<input
											id="{permissionName}-write"
											name={permissionName}
											type="checkbox"
											value={permissionOptions.write}
										/>
										write
									</label>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</Box>
{/if}
