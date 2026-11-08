import './app.css'
import { mount } from 'svelte'
import Home from './components/Home.svelte'

const app = mount(Home, {
  target: document.getElementById('app')!,
})

export default app
