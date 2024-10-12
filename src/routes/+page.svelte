<script>
    import { onMount } from 'svelte';
    import * as ls from 'lucide-svelte';
    import { Board } from '$lib/Board.js';
    import Toggle from '$lib/components/Toggle.svelte';

    let theme = 1;

    let board;
    let n = 5;
    onMount(() => {
        board = new Board(n);
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
</script>

<div class="flex flex-col justify-between items-center w-screen h-screen m-auto transition-all duration-75 {theme ? 'bg-neutral-900' : 'bg-white'}">
    <h1 class="m-4 text-2xl {theme ? 'text-white' : 'text-black'} font-bold">Queen's Game</h1>
    <Toggle icons={[ls.Sun, ls.Moon]} bind:selected={theme} class="absolute right-4 top-4"/>

    {#if board}
        <div class="flex flex-row m-auto">
            {#each board.cells as row, i}
                <div class="flex flex-col">
                    {#each row as cell, j}
                        {@const leftBorder = i === 0 || board.cells[i - 1][j].color != board.cells[i][j].color ? 'border-l-4 border-l-black' : 'border-l border-black'}
                        {@const rightBorder = i === board.cells.length - 1 ? 'border-r-4 border-r-black' : ''}
                        {@const topBorder = j === 0 || board.cells[i][j - 1].color != board.cells[i][j].color ? 'border-t-4 border-t-black' : 'border-t border-black'}
                        {@const bottomBorder = j === board.cells[0].length - 1 ? 'border-b-4 border-b-black' : ''}

                        <button 
                            class="size-16 {cell.color} border-0 {leftBorder} {rightBorder} {topBorder} {bottomBorder} m-auto"
                            on:mousedown|preventDefault={(event) => handleMouseDown(event, i, j)}
                            on:mouseup={() => handleMouseUp()}
                            on:contextmenu|preventDefault={() => {}}
                            on:mouseenter={() => handleMouseEnter(i, j)}
                        >
                            {#if cell.state === 'queen'}
                                <img class="size-16" src="/pieces/wQ.svg" alt="white queen"/>
                            {:else if cell.state === 'cross'}
                                <div class="pointer-events-none">
                                    <svelte:component this={ls.X} size="50%" stroke-width="1" class="m-auto"/>
                                </div>
                            {/if}
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
</div>