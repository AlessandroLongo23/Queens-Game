<script>
    import * as ls from 'lucide-svelte' 

    export let checked;
    export let label = '';
    export let icons = [ls.Check, ''];
</script>

<div class="flex flex-row justify-center gap-2 items-center p-1 bg-gray-300 rounded-full">
    {#if label}
        <label class="flex cursor-pointer items-center gap-2">
            <span class="text-black text-lg ms-4">{label}</span>
            
            <div class="relative flex items-center">
                <input bind:checked={checked} type="checkbox" class="before:content[''] transition-all duration-100 relative size-8 cursor-pointer appearance-none rounded-full before:absolute before:inset-0 disabled:cursor-not-allowed { checked && 'bg-white shadow-sm'} "/>
                <svelte:component this={checked ? icons[0] : icons[1]} size={18} class="absolute transition-all duration-100 text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
            </div>
        </label>
    {:else}
        <div class="relative flex items-center">
            <input bind:checked={checked} type="checkbox" class="before:content[''] transition-all duration-100 relative size-8 cursor-pointer appearance-none rounded-full before:absolute before:inset-0 disabled:cursor-not-allowed { checked && 'bg-white shadow-sm'} "/>
            <svelte:component this={checked ? icons[0] : icons[1]} size={18} class="absolute transition-all duration-100 text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
        </div>
    {/if}
</div>



