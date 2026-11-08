<script lang="ts">
  import { onMount } from 'svelte';
  import Brand from './Brand.svelte';
  import SourceLinks from './SourceLinks.svelte';
  import AboutModel from './AboutModel.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import { themeStore } from '../stores/themeStore';
  import { initialDimensions } from '../data/dimensionsData';
  import { MODEL } from '../lib/maturity';

  onMount(() => {
    themeStore.init();
  });
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="page">
  <header class="site-header">
    <div class="container header-inner">
      <Brand />
      <button
        class="btn-theme-toggle"
        on:click={themeStore.toggle}
        aria-pressed={$themeStore === 'dark'}
      >
        <span class="sr-only">Dark mode</span>
        <span aria-hidden="true">{$themeStore === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    </div>
  </header>

  <main id="main-content" class="container" tabindex="-1">
    <div class="hero">
      <h2>Assess your organization's accessibility maturity</h2>
      <p>
        Work through seven dimensions, record the evidence behind each proof point, and decide the
        maturity level your evidence supports.
      </p>
      <a class="button" href="./tool.html">Start the assessment</a>
      <p class="hero-note">No account, no tracking. Answers stay in your browser.</p>
    </div>

    <SourceLinks />

    <AboutModel />

    <section class="dimensions" aria-labelledby="dimensions-heading">
      <h2 id="dimensions-heading">What you'll assess</h2>
      <p class="lead">
        Seven dimensions, each assessed against four levels: Inactive, Launch, Integrate and Optimize.
        The definitions for each are in the
        <a href={MODEL.url} target="_blank" rel="noopener noreferrer">
          Group Note
          <span class="sr-only">(opens in a new tab)</span>
        </a>.
      </p>
      <ul class="dimension-names">
        {#each initialDimensions as dimension}
          <li>{dimension.name}</li>
        {/each}
      </ul>
      <p class="closing">
        <a class="button" href="./tool.html">Start the assessment</a>
      </p>
    </section>
  </main>

  <SiteFooter />
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
  }

  .site-header {
    background: linear-gradient(135deg, var(--color-header-bg-start) 0%, var(--color-header-bg-end) 100%);
    color: var(--color-header-text);
    padding: 2rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .btn-theme-toggle {
    background-color: transparent;
    color: var(--color-header-text);
    border: 2px solid currentColor;
    border-radius: 6px;
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .btn-theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  main {
    flex: 1;
    padding: 2rem 1rem;
  }

  main:focus {
    outline: none;
  }

  .hero {
    margin-bottom: 2.5rem;
    max-width: 60ch;
  }

  .hero h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.15rem;
    margin-bottom: 1.5rem;
  }

  .hero .hero-note {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    margin-top: 1rem;
    margin-bottom: 0;
  }

  .button {
    display: inline-block;
    background-color: var(--color-btn-secondary-bg);
    color: #ffffff;
    text-decoration: none;
    padding: 0.85rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    min-height: 44px;
  }

  .button:hover {
    background-color: var(--color-btn-secondary-hover);
    text-decoration: underline;
  }

  .dimensions h2 {
    margin-bottom: 0.75rem;
  }

  .lead {
    max-width: 65ch;
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
  }

  .dimension-names {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    max-width: 70ch;
  }

  .dimension-names li {
    background: var(--color-surface);
    border: 1px solid var(--color-card-border);
    border-radius: 999px;
    padding: 0.5rem 1rem;
    font-weight: 500;
  }

  .closing {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .hero h2 {
      font-size: 1.5rem;
    }
  }
</style>
