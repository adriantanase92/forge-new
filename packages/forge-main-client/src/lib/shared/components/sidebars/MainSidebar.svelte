<script lang="ts">
	import { colors, sidebarUserMenuItems } from '$lib/shared';
	import { LL } from '$i18n/i18n-svelte';
	import SvgIcon from '../general/svg/SvgIcon.svelte';
	import Logo from '../logo/Logo.svelte';
	import { page } from '$app/stores';
	import Button from '../general/button/Button.svelte';
	import { version } from 'dompurify';
	import { number } from 'zod';

	const activeLink = (linkName: string) =>
		$page.url.pathname.includes(linkName)
			? 'bg-cobalt text-white'
			: 'text-rhino hover:bg-gallery';

	const activeLinkIcon = (linkName: string) =>
		$page.url.pathname.includes(linkName) ? colors.white : colors.rhino;
</script>

<aside
	id="main-sidebar"
	class="sidebar transition-all duration-500 ease-in-out fixed shadow-sm max-lg:z-[60] lg:shrink-0 lg:relative lg:w-72 h-screen max-lg:[&amp;.show_.sidebar-bg]:opacity-60 [&amp;.show_.sidebar-bg]:inset-0 [&amp;.show_.sidebar-content]:translate-x-0"
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
		<div class="flex flex-col h-full">
			<Logo />

			<hr class="my-4 h-0.5 border-t-0 bg-neutral-100 opacity-100" />

			<div class="w-full inline-flex flex-col px-3 pb-3 grow">
				<!-- title & menu -->
				<ul class="sidebar-menu flex flex-col">
					{#each sidebarUserMenuItems($LL) as item}
						<li>
							<a
								href={item.url}
								class="flex items-center py-3 pl-12 pr-6 mb-1 leading-none gap-2.5 font-secondary font-medium rounded-full {activeLink(
									item.id
								)}"
								target={item.isExternal ? '_blank' : '_self'}
							>
								{#key activeLinkIcon(item.id)}
									<SvgIcon
										name={item.icon}
										width="24"
										height="24"
										color={activeLinkIcon(item.id)}
									/>
								{/key}
								{item.text}
							</a>
						</li>
					{:else}
						<li>{$LL.menus.sidebar.noItemsFoundMessage()}</li>
					{/each}
				</ul>
			</div>

			<footer class="flex flex-col items-center gap-2 pt-2 pb-4">
				<Button
					class="p-2"
					kind="custom"
					color="transparent"
					on:click={() => console.log('logout')}
				>
					<div class="flex flex-col items-center gap-1">
						<SvgIcon name="power-on-off" iconHeight="34" iconWidth="34" />
						<div class="font-bold">{$LL.buttonsOrLinks.logOut()}</div>
					</div>
				</Button>

				<div class="text-xs opacity-50">{$LL.app.version({ versionNumber: '1.0.0' })}</div>
			</footer>
		</div>
	</div>
</aside>
