<script lang="ts">
	import { sidebarUserMenuItems } from '$lib/shared';
	import { LL } from '$i18n/i18n-svelte';
	import SvgIcon from '../general/svg/SvgIcon.svelte';
	import Logo from '../logo/Logo.svelte';
</script>

<aside
	id="main-sidebar"
	class="sidebar transition-all duration-500 ease-in-out fixed max-lg:z-[60] lg:shrink-0 lg:relative lg:w-72 h-screen max-lg:[&amp;.show_.sidebar-bg]:opacity-60 [&amp;.show_.sidebar-bg]:inset-0 [&amp;.show_.sidebar-content]:translate-x-0"
>
	<!-- backdrop -->
	<div
		data-close="#main-sidebar"
		class="sidebar-bg fixed z-40 opacity-0 -top-full bg-black"
	></div>

	<div
		id="sidebar-content"
		class="sidebar-content transition-all duration-300 ease-in-out fixed z-40 max-lg:-translate-x-full max-lg:bg-surface-500 left-0 top-0 bottom-0 h-screen w-72 overflow-auto scrollbars pt-2"
	>
		<Logo />

		<hr class="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100" />

		<!-- Standart drawer -->
		<div class="w-full inline-flex flex-col px-3 pb-3">
			<!-- title & menu -->
			<ul class="sidebar-menu flex flex-col">
				{#each sidebarUserMenuItems($LL) as item}
					<li>
						<a
							href={$LL.routes.protected.dashboard()}
							class="active flex items-center py-3 pl-12 pr-6 mb-1 leading-none gap-2.5 rounded-full hover-icon [&amp;.active]:text-gray-900 dark:[&amp;.active]:text-gray-100 [&amp;.active]:bg-primary-600/[0.08] dark:[&amp;.active]:bg-primary-200/10 hover:bg-primary-600/[0.08] dark:hover:bg-primary-200/[0.08]"
						>
							{item.text}
						</a>
					</li>
				{:else}
					<p>No sidebar menu items found!</p>
				{/each}
			</ul>
		</div>
	</div>
</aside>
