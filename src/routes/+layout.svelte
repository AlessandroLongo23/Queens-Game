<script>
    import "../style/app.css";
    import * as ls from 'lucide-svelte';
    import { theme, sound, info } from '$lib/stores.svelte.js';

    import Toggle from '$lib/components/Toggle.svelte';
    import Button from '$lib/components/Button.svelte';
    import Checkbox from '$lib/components/Checkbox.svelte';
    import { onMount } from "svelte";
    let { children } = $props();

    let audioSound, buttonSound;
    onMount(() => {
        audioSound = new Audio('/sounds/audio.ogg');
        buttonSound = new Audio('/sounds/button.ogg');
    });

    $effect(() => {
        if (audioSound) {
            if ($sound) {
                audioSound.currentTime = 0;
                audioSound.play();
            } else {
                audioSound.pause();
                audioSound.currentTime = 0;
            }
        }
    });

    let closeWindowMessage = $state(false);
    function toggleCloseWindowMessage() {
        if (!$info) {
            closeWindowMessage = !closeWindowMessage;
            buttonSound.currentTime = 0;
            $sound && buttonSound.play();
        }
    }

    function closeCurrentWindow() {
        window.close();
    }

    let downloadsModal = $state(false);
    function toggleDownloadsModal() {
        if (!$info) {
            downloadsModal = !downloadsModal;
            buttonSound.currentTime = 0;
            $sound && buttonSound.play();
        }
    }
</script>

<div class="absolute {!closeWindowMessage && 'pointer-events-none'} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
    <div class="{closeWindowMessage ? 'opacity-100' : 'opacity-0 translate-y-4'} transition-all duration-200 flex flex-col justify-center items-center text-center px-6 py-4 rounded-lg border-2 
        { $theme == 0 ? 
            'bg-white border-black text-black' : 
            'bg-neutral-900 border-white text-white' 
        }"
    >
        <p class="text-lg mt-2 mb-4 { $theme == 0 ? 'text-black' : 'text-white'}">
            Are you sure you want to exit?
        </p>
        
        <div class="flex flex-row justify-center items-center gap-4">
            <Button text="Cancel" color="neutral" func={() => toggleCloseWindowMessage()}/>
            <Button text="Exit" color="red" func={() => closeCurrentWindow()}/>
        </div>
    </div>
</div>

<div class="absolute {!downloadsModal && 'pointer-events-none'} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
    <div class="{downloadsModal ? 'opacity-100' : 'opacity-0 translate-y-4'} transition-all duration-200 flex flex-col justify-center items-center text-center px-6 py-4 rounded-lg border-2 
        { $theme == 0 ? 
            'bg-white border-black text-black' : 
            'bg-neutral-900 border-white text-white' 
        }"
    >
        <p class="text-lg mt-2 mb-4 { $theme == 0 ? 'text-black' : 'text-white'}">
            Select your OS for the download
        </p>
        
        <div class="flex flex-row justify-center items-center gap-4">
            <Button text="Windows 64bit" icon={"fa-brands fa-windows"} iconSize={32} color="neutral" downloadHref="\bundles\queens-game_0.1.0_x64_en-US.msi"/>
        </div>
    </div>
</div>

<div class="absolute flex flex-row justify-end items-center gap-8 top-10 right-10">
    <Checkbox icons={[ls.Volume2, ls.VolumeX]} bind:checked={$sound}/>
    <Toggle icons={[ls.Sun, ls.Moon]} colors={['text-yellow-400', 'text-blue-900']} bind:selected={$theme}/>
    {#if window.__TAURI__}
        <Button text="Exit" color="red" icon={ls.LogOut} iconSize={32} func={() => toggleCloseWindowMessage()}/>
    {:else}
        <Button text="Download" color="blue" icon={ls.Download} iconSize={32} func={() => toggleDownloadsModal()}/>
    {/if}
</div>
{@render children?.()}

<style>
    :global(*) {
        user-select: none;
        font-size: 16px;
    }
</style>