<script lang="ts">
    import SvgIcon from '../svg/SvgIcon.svelte';
    import LL from '$i18n/i18n-svelte';
    import { capitalize } from '$lib/shared/utils';

    // Specify default value for the search input
    export let search = '';
    // Specify the css classes for the wrapper div around the search input and icon
    export let wrapperClasses: string = 'relative w-full sm:w-auto';
    // Specify the css classes for the search input
    export let inputClasses: string =
        'max-w-full sm:max-w-[240px] w-full sm:w-auto rounded-lg border border-solid border-yoboo-rhino-alt py-2 pl-10 pr-3 text-yoboo-rhino';
    // Specify the css classes for the icon element
    export let searchClasses: string = 'absolute left-2 top-2';

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        search = target.value;
    }
</script>

<div class={wrapperClasses}>
    <SvgIcon
        class={searchClasses}
        name="search"
        width="24"
        height="24"
    />
    <input
        type="text"
        bind:value={search}
        on:input={handleInput}
        placeholder="{capitalize($LL.fields.search.text())}..."
        class={inputClasses}
    />
</div>
