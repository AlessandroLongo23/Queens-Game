<script>
    import * as ls from 'lucide-svelte' 

    let { checked = $bindable(), label = '', icons = [ls.Check, ''] } = $props();
</script>

<div class="flex flex-row justify-center gap-2 items-center p-1 bg-gray-300 rounded-full">
    {#if label}
        {@const SvelteComponent = checked ? icons[0] : icons[1]}
        <label class="flex cursor-pointer items-center gap-2">
            <span class="text-black text-lg ms-4">{label}</span>
            
            <div class="relative flex items-center">
                <input bind:checked={checked} type="checkbox" class="before:content[''] transition-all duration-100 relative size-8 cursor-pointer appearance-none rounded-full before:absolute before:inset-0 disabled:cursor-not-allowed { checked && 'bg-white shadow-sm'} "/>
                <SvelteComponent size={18} class="absolute transition-all duration-100 text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
            </div>
        </label>
    {:else}
        {@const SvelteComponent_1 = checked ? icons[0] : icons[1]}
        <div class="relative flex items-center">
            <input bind:checked={checked} type="checkbox" class="before:content[''] transition-all duration-100 relative size-8 cursor-pointer appearance-none rounded-full before:absolute before:inset-0 disabled:cursor-not-allowed { checked && 'bg-white shadow-sm'} "/>
            <SvelteComponent_1 size={18} class="absolute transition-all duration-100 text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
        </div>
    {/if}
</div>



