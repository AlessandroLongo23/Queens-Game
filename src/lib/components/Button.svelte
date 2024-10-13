<script>
    import { theme } from "$lib/stores";

    export let text = '';
    export let color = 'neutral';
    export let func = () => {};
    export let icon = '';
    export let iconSize = '';
    export let disabled = false;

    let lightTheme, darkTheme;
    switch (color) {
        case 'neutral':
            lightTheme = 'text-black bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 border-white';
            darkTheme = 'text-white bg-neutral-900 hover:bg-neutral-500/25 active:bg-neutral-500/50 border-neutral-500'
            break;
        case 'red':
            lightTheme = 'text-black bg-red-400 hover:bg-red-500 border-white';
            darkTheme = 'text-white bg-neutral-900 hover:bg-red-500/25 active:bg-red-500/50 border-red-500'
            break;
        case 'blue':
            lightTheme = 'text-black bg-blue-400 hover:bg-blue-500 border-white';
            darkTheme = 'text-white bg-neutral-900 hover:bg-blue-500/25 active:bg-blue-500/50 border-blue-500'
            break;
    }
</script>

<button on:click={func} class="flex flex-row justify-center items-center gap-2 py-1 transition-colors rounded-lg shadow-sm border-2 { icon ? 'ps-3 pe-4' : 'px-4'} { disabled && 'opacity-50 cursor-not-allowed' } { $theme == 0 ? lightTheme : darkTheme }">
    {#if icon}
        <svelte:component this={icon} size={iconSize} class="p-1 m-auto"/>
    {/if}

    { text }
</button>