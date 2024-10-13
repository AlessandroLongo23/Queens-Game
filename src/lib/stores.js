import { writable } from 'svelte/store';

export const theme = writable(0);
export const sound = writable(true);
export const info = writable(false);