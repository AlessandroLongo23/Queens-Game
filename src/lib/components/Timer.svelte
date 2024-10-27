<script>
    import { theme } from '$lib/stores.svelte.js';

    let { seconds = $bindable(0) } = $props();

    let ss, mm, timeString = $state();
    updateTime();

    function updateTime() {
        mm = Math.floor(seconds / 60);
        ss = seconds % 60;
        timeString = `${mm}:${ss < 10 ? '0' : ''}${ss}`;
    }

    $effect(() => {
        updateTime();
    });
</script>

<div class="flex flex-col justify-center items-center">
    <div class="text-2xl text-center { $theme == 0 ? 'text-black' : 'text-white'}">Time: {timeString}</div>
</div>