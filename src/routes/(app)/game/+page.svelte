<script>
    import { onMount, onDestroy } from 'svelte';
    import * as ls from 'lucide-svelte';
    import { Board } from '$lib/Board.js';

    import Timer from '$lib/components/Timer.svelte';
    import Confetti from '$lib/components/Confetti.svelte';
    import Button from '$lib/components/Button.svelte';
    // import DialogBox from '$lib/components/DialogBox.svelte';
    // TODO replace with dialog boxex

    import { theme, sound, info } from '$lib/stores.js';

    let board, seconds, win, n, cellSize;
    let placeQueenSound, removeQueenSound, crossSound, winSound;
    let playSound, errorSound, resetSound, buttonSound;
    onMount(() => {
        newGame();

        placeQueenSound = new Audio('/sounds/placeQueen.mp3');
        removeQueenSound = new Audio('/sounds/removeQueen.mp3');
        crossSound = new Audio('/sounds/cross.mp3');
        winSound = new Audio('/sounds/win.mp3');

        errorSound = new Audio('/sounds/error.ogg');
        resetSound = new Audio('/sounds/reset.ogg');
        buttonSound = new Audio('/sounds/button.ogg');

        playSound = new Audio('/sounds/play.ogg');
        playSound.currentTime = 0;
        playSound.play();
    });

    // TODO move interactions to util file
    let isDragging = false;
    let draggingMode = 'remove';

    function handleMouseDown(event, i, j) {
        if (win)
            return;
    
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
        if (board.cells[i][j].state == 'queen') {
            placeQueenSound.currentTime = 0;
            $sound && placeQueenSound.play();
        } else {
            removeQueenSound.currentTime = 0;
            $sound && removeQueenSound.play();
        }

        if (board.checkError()) {
            errorSound.currentTime = 0;
            $sound && errorSound.play();
        }

        board = board;
    }

    function handleRightClick(i, j) {
        board.cells[i][j].state = board.cells[i][j].state !== 'cross' ? 'cross' : 'empty';
        if (board.cells[i][j].state == 'cross') {
            crossSound.currentTime = 0;
            $sound && crossSound.play();
        }

        if (board.checkError()) {
            errorSound.currentTime = 0;
            $sound && errorSound.play();
        }
        board = board;
    }

    function handleMouseEnter(i, j) {
        if (!isDragging || win)
            return;

        if (draggingMode === 'place')
            setCross(i, j);
        else
            removeCross(i, j);
    }

    function setCross(i, j) {
        board.cells[i][j].state = 'cross';
        crossSound.currentTime = 0;
        $sound && crossSound.play();
        board = board;
    }

    function removeCross(i, j) {
        board.cells[i][j].state = 'empty';
        crossSound.currentTime = 0;
        $sound && crossSound.play();
        board = board;
    }

    const updateTime = () => {
        if (!win)
            seconds++;
    };

    const interval = setInterval(updateTime, 1000);
    onDestroy(() => {
        clearInterval(interval);
    });

    let winPlayed = false;
    $: setTimeout(() => {
        win = board.checkWin();
        if (win && !winPlayed) {
            winSound.currentTime = 0;
            $sound && winSound.play();
            winPlayed = true;
        }
    });

    function newGame() {
        n = Math.floor(Math.random() * 4) + 5
        cellSize = n == 5 || n == 6 ? 'size-20' : n == 7 ? 'size-16' : 'size-12';
        board = new Board(n);
        seconds = 0;
        win = false;
        winPlayed = false;

        if (buttonSound) {
            buttonSound.currentTime = 0;
            $sound && buttonSound.play();
        }
    }

    function toggleInfo() {
        if (!closeWindowMessage) {
            $info = !$info;
            buttonSound.currentTime = 0;
            $sound && buttonSound.play();
        }
    }

    function handleKeydown(event) {
        if (event.key === 'i')
            toggleInfo();

        if (event.key === 'Escape')
            toggleCloseWindowMessage();
    }

    let closeWindowMessage = false;
    function toggleCloseWindowMessage() {
        if (!$info) {
            closeWindowMessage = !closeWindowMessage;
            buttonSound.currentTime = 0;
            $sound && buttonSound.play();
        }
    }

    function resetGrid() {
        if (board.cells.flat().some(c => c.state !== 'empty')) {
            board.reset();
            board = board;

            resetSound.currentTime = 0;
            $sound && resetSound.play();
        }
    }
</script>

<div on:mouseup={() => handleMouseUp()} on:keydown={handleKeydown} role="button" tabindex="0" class="cursor-default flex flex-col justify-between items-center w-screen h-screen m-auto transition-all duration-75 {$theme ? 'bg-neutral-900' : 'bg-white'}">
    <div class="flex flex-row items-center gap-4">
        <h1 class="m-8 text-5xl font-semibold {$theme ? 'text-white' : 'text-black'}">Queen's Game</h1>
    </div>

    <div class="absolute {!$info && 'pointer-events-none'} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
        <div class="{$info ? 'opacity-100' : 'opacity-0 translate-y-4'} transition-all duration-200 flex flex-col justify-center items-center text-center px-6 py-4 rounded-lg border-2 
            { $theme == 0 ? 
                'bg-white border-black text-black' : 
                'bg-neutral-900 border-white text-white' 
            }"
        >
            <div class="flex flex-col items-center">
                <div class="flex flex-row justify-center items-center gap-2 mb-2">
                    <svelte:component this={ls.Info} size={36} class="p-1 m-auto"/>
                    <h1 class="text-2xl font-bold my-2 text-center { $theme == 0 ? 'text-black' : 'text-white'}">
                        How to play
                    </h1>
                </div>

                <p class="text-lg mb-8 text-start">
                    To win the game you need to place a queen 
                    <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"/>
                    on each row, column, and color region, but they can't be next to each other.
                </p>
                <p class="text-lg mb-4 text-start">
                    Left click on a cell to place a queen
                    <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"/>
                    , or right click to flag it with a cross
                    <svelte:component this={ls.X} size={16} class="inline-block m-auto"/>.
                </p>
            </div>
            
            <Button text="Got it!" color="blue" func={() => toggleInfo()}/>
        </div>
    </div>

    {#if win}
        <Confetti/>
    {/if}

    <div class="absolute {!win && 'pointer-events-none'} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="{win ? 'opacity-100' : 'opacity-0 translate-y-4'} flex flex-col justify-center items-center text-center p-4 rounded-lg border-2
            { $theme == 0 ? 
                'bg-white border-black text-black' : 
                'bg-neutral-900 border-white text-white' 
            }"
        >
            <h1 class="text-2xl mb-4">You win!</h1>
            <Button text="Next level" color="blue" func={() => newGame()}/>
        </div>
    </div>

    {#if board}
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex flex-col justify-center items-center m-auto translate-y-8">
                <div class="relative w-72 py-2 rounded-t-lg">
                    <Timer bind:seconds={seconds}/>
                </div>

                <div class="flex flex-row m-auto border-2 bg-black border-black"> 
                    {#each board.cells as row, i}
                        <div class="flex flex-col">
                            {#each row as cell, j}
                                {@const leftBorder = i === 0 || board.cells[i - 1][j].color != board.cells[i][j].color ? 'border-l-2' : 'border-l border-l-black/25'}
                                {@const rightBorder = i === board.cells.length - 1 || board.cells[i + 1][j].color != board.cells[i][j].color ? 'border-r-2' : 'border-r border-r-black/25'}
                                {@const topBorder = j === 0 || board.cells[i][j - 1].color != board.cells[i][j].color ? 'border-t-2' : 'border-t border-t-black/25'}
                                {@const bottomBorder = j === board.cells[0].length - 1 || board.cells[i][j + 1].color != board.cells[i][j].color ? 'border-b-2' : 'border-b border-b-black/25'}
                                <button 
                                    class="{cellSize} {cell.color} {leftBorder} {rightBorder} {topBorder} {bottomBorder} border-black m-auto"
                                    on:mousedown|preventDefault={(event) => handleMouseDown(event, i, j)}
                                    on:mouseenter={() => handleMouseEnter(i, j)}
                                >
                                    {#if cell.error}    
                                        <img src="/stripe.svg" class="absolute -translate-y-1/2 z-20 {cellSize} p-1" alt="error"/> 
                                    {/if}

                                    {#if cell.state === 'queen'}
                                        <img class="absolute z-50 -translate-y-1/2 {n == 5 || n == 6 ? 'size-20' : n == 7 ? 'size-16' : 'size-12'} p-1" src="/pieces/wQ.svg" alt="white queen"/>
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

                <div class="flex flex-row justify-center items-center gap-8 mt-4">
                    <Button text="Reset" color="neutral" icon={ls.RotateCcw} iconSize={36} func={() => resetGrid()} disabled={board.cells.flat().every(c => c.state === 'empty')}/>
                    <Button text="How to play" color="neutral" icon={ls.Info} iconSize={36} func={() => toggleInfo()}/>
                </div>
            </div>
        </div>
    {/if}
</div>