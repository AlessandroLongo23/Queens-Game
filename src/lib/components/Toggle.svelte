<script>
    import * as LucideIcons from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { sound } from '$lib/stores.svelte.js';

    let themeSound;
    onMount(() => {
        themeSound = new Audio('/sounds/themes.ogg');
    });

    function selectIcon(index) {
        if (index != selected) {
            selected = index;
            themeSound.currentTime = 0;
            $sound && themeSound.play();
        }
    }

    let off = 2.25;
    let { selected = $bindable(0), colors, icons } = $props();

    let options = [];
    for (let i in icons)
        options.push({
            icon: icons[i],
            translateClass: 'transform: translateX(' + (off * i) + 'rem);'
        })
</script>

<div class="cursor-default relative h-10 rounded-full bg-slate-200 p-1 transition-all duration-300 ease-in-out hover:bg-slate-300 dark:bg-gray-300" aria-label={`Selected icon: ${selected}`} style="width: {off * icons.length + 0.25}rem">
    <div class="absolute left-1 w-8 aspect-square transform rounded-full bg-white shadow-md transition-all duration-500 ease-in-out" style="{options[selected].translateClass}"></div>

    <div class="relative flex h-full w-full items-center justify-between px-2">
        {#each options as option, i}
            <button onclick={() => selectIcon(i)} class="transform transition-all duration-300 hover:scale-110 {colors && selected === i ? colors[i] : ''} {selected === i ? 'cursor-default scale-110 text-black' : 'cursor-pointer scale-90 text-gray-600'}">
                <option.icon size={16}/>
            </button>
        {/each}
    </div>
</div>