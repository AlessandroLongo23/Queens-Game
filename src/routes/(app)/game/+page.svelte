<script>
    import { onMount, onDestroy } from 'svelte';
    import * as ls from 'lucide-svelte';
    import { Board } from '$lib/Board.js';
    import Toggle from '$lib/components/Toggle.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import Confetti from '$lib/components/Confetti.svelte';
    import { theme } from '$lib/stores.js';

    let board, seconds, win, n;
    onMount(() => {
        newGame();
    });

    let isDragging = false;
    let draggingMode = 'remove';

    function handleMouseDown(event, i, j) {
        if (event.button === 0) {
            handleLeftClick(i, j);
        } else if (event.button === 2) {
            isDragging = true;
            draggingMode = board.cells[i][j].state === 'empty' ? 'place' : 'remove';
            handleRightClick(i, j);
        }
    }

    function handleMouseUp() {
        isDragging = false;
    }

    function handleLeftClick(i, j) {
        board.cells[i][j].state = board.cells[i][j].state !== 'queen' ? 'queen' : 'empty';
        board.cells = board.cells;
    }

    function handleRightClick(i, j) {
        board.cells[i][j].state = board.cells[i][j].state !== 'cross' ? 'cross' : 'empty';
        board.cells = board.cells;
    }

    function handleMouseEnter(i, j) {
        if (!isDragging)
            return;

        if (draggingMode === 'place')
            setCross(i, j);
        else
            removeCross(i, j);
    }

    function setCross(i, j) {
        board.cells[i][j].state = 'cross';
        board.cells = board.cells;
    }

    function removeCross(i, j) {
        board.cells[i][j].state = 'empty';
        board.cells = board.cells;
    }

    const updateTime = () => {
        if (!win)
            seconds++;
    };

    const interval = setInterval(updateTime, 1000);
    onDestroy(() => {
        clearInterval(interval);
    });

    $: board && setTimeout(() => {
        win = board.checkWin();
    });

    function newGame() {
        n = Math.floor(Math.random() * 4) + 5
        board = new Board(n);
        seconds = 0;
        win = false;
    }

    let info = false;
    function toggleInfo() {
        if (!closeWindowMessage)
            info = !info;
    }

    function handleKeydown(event) {
        console.log(event.key);
        if (event.key === 'i')
            toggleInfo();

        if (event.key === 'Escape')
            toggleCloseWindowMessage();
    }

    let closeWindowMessage = false;
    function toggleCloseWindowMessage() {
        if (!info)
            closeWindowMessage = !closeWindowMessage;
    }

    function closeCurrentWindow() {
        window.close();
    }

    function resetGrid() {
        board.reset();
        board = board;
    }
</script>

<div on:mouseup={() => handleMouseUp()} on:keydown={handleKeydown} role="button" tabindex="0" class="cursor-default flex flex-col justify-between items-center w-screen h-screen m-auto transition-all duration-75 {$theme ? 'bg-neutral-900' : 'bg-white'}">
    <div class="flex flex-row items-center gap-4">
        <h1 class="m-8 text-5xl font-semibold {$theme ? 'text-white' : 'text-black'}">Queen's Game</h1>
    </div>

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

    <div class="absolute {!info ? 'pointer-events-none' : ''} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
        <div class="{info ? 'opacity-100' : 'opacity-0 translate-y-4'} transition-all duration-200 flex flex-col justify-center items-center text-center { $theme == 0 ? 'bg-white border-black text-black' : 'bg-neutral-900 border-white text-white' } px-6 py-4 rounded-lg border-2">
            <div class="flex flex-col items-center">
                <div class="flex flex-row justify-center items-center gap-2 mb-2">
                    <svelte:component this={ls.Info} size={36} class="p-1 m-auto"/>
                    <h1 class="text-2xl font-bold my-2 text-center { $theme == 0 ? 'text-black' : 'text-white'}">
                        How to play
                    </h1>
                </div>

                <p class="text-lg mb-4 text-start">
                    To win the game you need to place a queen 
                    <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"/>
                    on each row, column and color.
                </p>
                <p class="text-lg mb-4 text-start">
                    Left click on a cell to place a queen
                    <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"/>
                    , or right click to flag it with a cross
                    <svelte:component this={ls.X} size={16} class="inline-block m-auto"/>.
                </p>
            </div>
            
            <button on:click={toggleInfo} class="transition-colors duration-200 border-2 rounded-lg px-4 py-2 mb-2 mt-2 text-black
                { $theme == 0 ? 
                    'bg-blue-400 hover:bg-blue-500 border-white text-black' : 
                    'bg-neutral-900 border-blue-500 text-white hover:bg-blue-500/25'
                }
            ">
                Got it!
            </button>
        </div>
    </div>

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

    {#if win}
        <Confetti/>
    {/if}
    <div class="absolute {!win ? 'pointer-events-none' : ''} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="{win ? 'opacity-100' : 'opacity-0 translate-y-4'} flex flex-col justify-center items-center text-center bg-white p-4 rounded-lg border-2 border-black">
            <h1 class="text-2xl text-black mb-2">You win!</h1>
            
            <button class="text-white bg-blue-400 rounded-lg px-4 py-2" on:click={() => newGame()}>
                Next Level
            </button>
        </div>
    </div>

    {#if board}
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex flex-col justify-center items-center gap-4 m-auto translate-y-8">
                <Timer bind:seconds={seconds}/>

                <div class="flex flex-row m-auto border-4 border-white">
                    {#each board.cells as row, i}
                        <div class="flex flex-col">
                            {#each row as cell, j}
                                {@const leftBorder = i === 0 || board.cells[i - 1][j].color != board.cells[i][j].color ? 'border-l-4 border-l-black' : 'border-l border-black'}
                                {@const rightBorder = i === board.cells.length - 1 ? 'border-r-4 border-r-black' : ''}
                                {@const topBorder = j === 0 || board.cells[i][j - 1].color != board.cells[i][j].color ? 'border-t-4 border-t-black' : 'border-t border-black'}
                                {@const bottomBorder = j === board.cells[0].length - 1 ? 'border-b-4 border-b-black' : ''}
                                <button 
                                    class="{n == 5 || n == 6 ? 'size-20' : n == 7 ? 'size-16' : 'size-12'} {cell.color} border-0 {leftBorder} {rightBorder} {topBorder} {bottomBorder} m-auto"
                                    on:mousedown|preventDefault={(event) => handleMouseDown(event, i, j)}
                                    on:mouseenter={() => handleMouseEnter(i, j)}
                                >
                                    {#if cell.state === 'queen'}
                                        <img class="{n == 5 || n == 6 ? 'size-20' : n == 7 ? 'size-16' : 'size-12'} p-1" src="/pieces/wQ.svg" alt="white queen"/>
                                    {:else if cell.state === 'cross'}
                                        <div class="pointer-events-none">
                                            <svelte:component this={ls.X} size="50%" strokeWidth="1" class="m-auto"/>
                                        </div>
                                    {/if}
                                </button>
                            {/each}
                        </div>
                    {/each}
                </div>

                <div class="flex flex-row justify-center items-center gap-8">
                    <button on:click={resetGrid} class="flex flex-row justify-center items-center gap-2 py-1 ps-1 pe-3 transition-colors rounded-lg border border-white
                        { $theme == 0 ? 
                            'text-black bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-100 shadow-black/25' : 
                            'text-white bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-700 shadow-white/25'
                        }"    
                    >
                        <svelte:component this={ls.RotateCcw} size={36} class="p-1 m-auto"/>
                        Reset
                    </button>

                    <button on:click={toggleInfo} class="flex flex-row justify-center items-center gap-2 py-1 ps-1 pe-3 transition-colors rounded-lg border border-white
                        { $theme == 0 ? 
                            'text-black bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-100 shadow-black/25' : 
                            'text-white bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-700 shadow-white/25 '
                        }"    
                    >
                        <svelte:component this={ls.Info} size={36} class="p-1 m-auto"/>
                        How to play
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>