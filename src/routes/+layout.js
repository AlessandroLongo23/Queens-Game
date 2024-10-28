export const ssr = false;
export const prerender = true;
import { inject } from '@vercel/analytics';
 
inject({ mode: dev ? 'development' : 'production' });