import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const appElement: Element = document.getElementById('app')!;
const app: {} = mount(App, {
  target: appElement!,
});

export default app;
