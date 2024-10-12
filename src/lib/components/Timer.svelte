<script>
    import { theme } from '$lib/stores.js';

    export let seconds = 0;

    let ss, mm, timeString;
    updateTime();

    function updateTime() {
        mm = Math.floor(seconds / 60);
        ss = seconds % 60;
        timeString = `${mm}:${ss < 10 ? '0' : ''}${ss}`;
    }

    $: seconds && updateTime();
</script>

<div class="flex flex-col justify-center items-center">
    <div class="text-2xl text-center { $theme == 0 ? 'text-black' : 'text-white'}">Time: {timeString}</div>
</div>