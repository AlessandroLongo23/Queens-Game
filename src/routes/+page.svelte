<script>
    import { theme } from "$lib/stores";
    import * as ls from 'lucide-svelte';

    let closeWindowMessage = false;
    function toggleCloseWindowMessage() {
        if (!info)
            closeWindowMessage = !closeWindowMessage;
    }

    function closeCurrentWindow() {
        window.close();
    }
</script>

<div class="flex flex-col justify-center items-center h-screen {$theme ? 'bg-neutral-900' : 'bg-white'}">
    <div class="absolute {!closeWindowMessage ? 'pointer-events-none' : ''} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
        <div class="{closeWindowMessage ? 'opacity-100' : 'opacity-0 translate-y-4'} transition-all duration-200 flex flex-col justify-center items-center text-center bg-white p-4 rounded-lg border-2 border-black">
            <p class="text-lg text-black mt-2 mb-4">
                Are you sure you want to exit?
            </p>
            
            <div class="flex flex-row justify-center items-center gap-4">
                <button on:click={toggleCloseWindowMessage} class="text-black bg-neutral-200 hover:bg-neutral-300 rounded-lg px-4 py-2">Cancel</button>
                <button on:click={closeCurrentWindow} class="text-black bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2">Exit</button>
            </div>
        </div>
    </div>

    <div class="flex flex-col justify-center items-center mb-8">
        <div class="flex flex-row justify-center items-center">
            <p class="text-8xl font-medium { $theme == 0 ? 'text-black' : 'text-white'}">Queen's Game</p>
        </div>
    </div>

    <a href='/game' class="transition-colors text-2xl px-8 py-2 rounded-lg hover:no-underline border-2
        { $theme == 0 ?
            'text-black bg-red-400 hover:bg-red-500 active:bg-red-600 border-white' :
            'text-white hover:bg-red-500/25 active:bg-red-500/50 border-red-500'
        }"
    >
        Play!
    </a>
</div>