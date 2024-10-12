<script>
    import { theme } from "$lib/stores";
    import Toggle from '$lib/components/Toggle.svelte';
    import * as ls from 'lucide-svelte';

    let closeWindowMessage = false;
    function toggleCloseWindowMessage() {
        if (!info)
            closeWindowMessage = !closeWindowMessage;
    }
</script>

<div class="flex flex-col justify-center items-center h-screen {$theme ? 'bg-neutral-900' : 'bg-white'}">
    <div class="absolute flex flex-row justify-end items-center gap-8 top-10 right-10">
        <Toggle icons={[ls.Sun, ls.Moon]} colors={['text-yellow-400', 'text-blue-900']} bind:selected={$theme}/>

        <button on:click={toggleCloseWindowMessage} class="flex flex-row justify-center items-center gap-2 py-1 ps-3 pe-4 transition-colors rounded-lg shadow-sm border-2
            { $theme == 0 ?
                'text-black bg-red-400 hover:bg-red-500 active:bg-neutral-100 border-white' :
                'text-white bg-netutral-800 hover:bg-red-500/25 active:bg-neutral-100 border-red-500'
            }"
        >
            <svelte:component this={ls.LogOut} size={32} class="p-1 m-auto"/>
            Exit
        </button>
    </div>

    <div class="flex flex-col justify-center items-center mb-8">
        <div class="flex flex-row justify-center items-center">
            <p class="text-8xl font-medium { $theme == 0 ? 'text-black' : 'text-white'}">Queen's Game</p>
        </div>
    </div>

    <a href='/game' class="transition-colors text-2xl px-8 py-2 rounded-lg hover:no-underline border-2
        { $theme == 0 ?
            'text-black bg-red-400 hover:bg-red-500 active:bg-neutral-100 border-white' :
            'text-white bg-netutral-800 hover:bg-red-500/25 active:bg-neutral-100 border-red-500'
        }"
    >
        Play!
    </a>
</div>