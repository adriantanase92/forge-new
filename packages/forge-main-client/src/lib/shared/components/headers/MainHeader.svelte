<script lang="ts">
	import avatar from '$lib/assets/img/avatar.png';
</script>

<header
	id="main-header"
	class="[&.show]:translate-y-0 top-0 fixed h-16 px-4 lg:px-5 left-0 lg:left-72 right-0 flex flex-row items-center justify-between gap-3 z-50 transition-all duration-300 ease-in-out"
>
	<!-- trigger sidebar -->
	<button
		data-type="dialogs"
		data-target="#main-sidebar"
		class="relative inline-flex lg:hidden items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08] dark:focus:bg-primary-200/[0.08]"
	>
		<span class="material-symbols-outlined !text-[28px]">menu</span>
	</button>

	<!-- trigger compact layout -->
	<button
		data-type="toggle"
		data-target="#body-layout"
		class="compact-btn group relative hidden !items-center justify-center w-12 h-12 gap-x-2 py-2.5 px-6 rounded-[6.25rem] tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08] dark:focus:bg-primary-200/[0.08]"
	>
		<span class="material-symbols-outlined !text-[28px] menu-close">menu_open</span>
		<span class="material-symbols-outlined !text-[28px] menu-open">menu</span>
	</button>

	<!-- search form -->
	<div class="relative max-w-xl w-full hidden md:block">
		<!-- desktop search -->
		<div class="relative w-full">
			<button
				class="absolute left-1 top-1 hidden sm:inline-flex !items-center justify-center w-10 h-10 gap-x-2 p-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08] dark:focus:bg-primary-200/[0.08]"
			>
				<span class="material-symbols-outlined !text-2xl">search</span>
			</button>
			<input
				type="search"
				placeholder="Search..."
				class="max-sm:absolute max-sm:inset-x-0 block w-40 sm:w-80 md:w-full pl-14 h-12 rounded-full bg-white dark:bg-gray-900 py-2 px-4 ring-0 focus:outline-none focus:shadow"
			/>
		</div>
	</div>

	<div class="flex flex-row items-center gap-3 ml-auto md:ml-12">
		<!-- mobile search trigger -->
		<button
			data-type="dialogs"
			data-target="#dialog_search"
			class="btn relative inline-flex md:hidden !items-center justify-center w-12 h-12 gap-x-2 p-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08] dark:focus:bg-primary-200/[0.08]"
		>
			<span class="material-symbols-outlined !text-[28px]">search</span>
		</button>

		<div class="relative">
			<button
				data-type="dropdown"
				data-target="#dropdown0"
				class="btn relative !inline-flex !items-center justify-center w-12 h-12 gap-x-2 p-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium hover:bg-primary-600/[0.08] focus:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08] dark:focus:bg-primary-200/[0.08]"
			>
				<span
					aria-label="Languages"
					data-microtip-position="bottom"
					role="tooltip"
					class="material-symbols-outlined !text-[28px] pointer-events-none"
					>translate</span
				>
			</button>

			<!-- menus -->
			<ul
				id="dropdown0"
				data-type="dropdownmenu"
				class="[&amp;.show]:!opacity-100 [&amp;.show]:!visible opacity-0 invisible absolute top-[3.1rem] z-30 transition duration-400 ease-in-out left-auto right-0 transform translate-x-1/3 min-w-[150px] inline-flex flex-col py-2 rounded-xl bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-50/10"
			>
				<li class="relative">
					<a
						href="/"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<!-- <img src="../src/img/flags/US.svg" class="h-4" alt="English" /> -->
						English
					</a>
				</li>
				<li class="relative">
					<a
						href="/"
						class="w-full flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<!-- <img src="../src/img/flags/IT.svg" class="h-4" alt="Italy" /> -->
						French
					</a>
				</li>
				<li class="relative">
					<a
						href="/"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<!-- <img src="../src/img/flags/ES.svg" class="h-4" alt="Spain" /> -->
						Dutch
					</a>
				</li>
			</ul>
		</div>

		<!-- navbar right -->
		<div class="relative">
			<button
				data-type="dropdown"
				data-target="#dropdown1"
				class="btn w-12 h-12 gap-x-2 py-2.5 flex items-center gap-2 justify-center rounded-full text-sm tracking-[0.15px]"
			>
				<img
					src={avatar}
					alt="ari budin"
					class="w-10 h-10 flex-none rounded-full bg-primary-600 dark:bg-primary-200"
				/>
			</button>

			<!-- menus -->
			<ul
				id="dropdown1"
				data-type="dropdownmenu"
				class="[&amp;.show]:!opacity-100 [&amp;.show]:!visible opacity-0 invisible absolute top-[3.1rem] z-30 transition duration-400 ease-in-out left-auto right-0 min-w-[200px] inline-flex flex-col py-2 rounded-xl bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-50/10 max-sm:fixed max-sm:mt-3 max-sm:left-4 max-sm:right-4"
			>
				<li class="relative">
					<a
						href="../user/profile.html"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<span class="material-symbols-outlined">person</span>
						Profile
					</a>
				</li>
				<li class="relative">
					<a
						href="../user/edit-profile.html"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<span class="material-symbols-outlined">settings</span>
						Settings
					</a>
				</li>
				<li class="relative">
					<a
						href="../docs/support.html"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<span class="material-symbols-outlined">help_center</span>
						Help
					</a>
				</li>
				<li class="relative border-t border-gray-100 dark:border-gray-800">
					<a
						href="../auth/logout.html"
						class="flex flex-row items-center gap-3 py-2.5 px-6 hover-icon hover:bg-surface-200 dark:hover:bg-surfacedark-200"
					>
						<span class="material-symbols-outlined">power_settings_new</span>
						Logout
					</a>
				</li>
			</ul>
		</div>
	</div>
</header>
