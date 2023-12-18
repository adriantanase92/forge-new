<script lang="ts">
	import { colors } from '$lib/shared';
	import Button from '../general/button/Button.svelte';
	import LanguageSwitcher from '../i18n/LanguageSwitcher.svelte';
</script>

<header
	id="main-header"
	class="[&.show]:translate-y-0 top-0 fixed h-16 px-4 lg:px-5 left-0 lg:left-72 right-0 flex flex-row items-center justify-between gap-3 z-50 transition-all duration-300 ease-in-out"
>
	<!-- trigger sidebar -->
	<Button
		data-type="dialogs"
		data-target="#main-sidebar"
		class="relative inline-flex lg:hidden items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08]"
		kind="icon"
		color="transparent"
		icon="hamburger-menu"
		iconHeight="24"
		iconWidth="24"
		iconColor={colors.rhino}
	/>

	<!-- search form -->
	<div class="relative max-w-xl w-full hidden md:block">
		<!-- desktop search -->
		<div class="relative w-full">
			<Button
				class="absolute left-1 top-1 hidden sm:inline-flex !items-center justify-center w-10 h-10 gap-x-2 p-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08]"
				kind="icon"
				color="transparent"
				icon="search"
				iconWidth="24"
				iconHeight="24"
				iconColor={colors.rhino}
			/>

			<input
				type="search"
				placeholder="Search..."
				class="max-sm:absolute max-sm:inset-x-0 block w-40 sm:w-80 md:w-full pl-14 h-12 rounded-full bg-white py-2 px-4 ring-0 focus:outline-none focus:shadow"
			/>
		</div>
	</div>

	<div class="flex flex-row items-center gap-3 ml-auto md:ml-12">
		<!-- mobile search trigger -->
		<Button
			data-type="dialogs"
			data-target="#dialog_search"
			class="btn relative inline-flex md:hidden !items-center justify-center w-12 h-12 gap-x-2 p-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08]"
			kind="icon"
			color="transparent"
			icon="search"
			iconWidth="24"
			iconHeight="24"
			iconColor={colors.rhino}
		/>

		<div class="relative">
			<!-- Language swithcer menu button -->
			<LanguageSwitcher />
		</div>

		<!-- navbar right -->
		<div class="relative">
			<Button
				kind="icon"
				color="transparent"
				class="btn w-12 h-12 gap-x-2 py-2.5 flex items-center gap-2 justify-center rounded-full text-sm tracking-[0.15px]"
				icon="account"
				iconColor={colors.rhino}
				iconWidth="34"
				iconHeight="34"
			/>
		</div>
	</div>
</header>
