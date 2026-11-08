<script lang="ts">
  import { onMount } from 'svelte';
  import Brand from './Brand.svelte';
  import { themeStore } from '../stores/themeStore';
  import Introduction from './Introduction.svelte';
  import SiteFooter from './SiteFooter.svelte';
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
      <h2>A structured way to assess how your organization produces accessible digital services</h2>
      <p>
        Work through the seven dimensions of the {MODEL.acronym}, record the evidence behind each proof
        point, and decide the maturity level your evidence supports. Everything stays in your browser.
      </p>
      <a class="button" href="./tool.html">Start the assessment</a>
      <p class="hero-note">
        No account, no tracking, nothing sent to a server. You can export your answers as JSON at any
        time.
      </p>
    </div>

    <Introduction toggleable={false} />

    <section class="dimensions" aria-labelledby="dimensions-heading">
      <h2 id="dimensions-heading">The seven dimensions</h2>
      <p class="lead">
        The model is organized around seven dimensions of an organization, each assessed against the
        same four maturity levels.
      </p>
      <ul class="dimension-overview">
        {#each initialDimensions as dimension}
          <li>
            <h3>{dimension.name}</h3>
            <p>{dimension.description}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section class="next-step" aria-labelledby="next-step-heading">
      <h2 id="next-step-heading">Ready to begin?</h2>
      <p>
        The assessment takes about 30 to 60 minutes for a first pass. You do not need to complete it in
        one sitting: answers stay in this browser until you clear them.
      </p>
      <a class="button" href="./tool.html">Start the assessment</a>
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

  .dimensions {
    margin-top: 3rem;
  }

  .dimensions h2 {
    margin-bottom: 0.5rem;
  }

  .lead {
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
    max-width: 65ch;
  }

  .dimension-overview {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 1.5rem;
  }

  .dimension-overview li {
    background: var(--color-surface);
    border: 1px solid var(--color-card-border);
    border-radius: 8px;
    padding: 1.25rem;
  }

  .dimension-overview h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .dimension-overview p {
    color: var(--color-text-muted);
    margin: 0;
  }

  .next-step {
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: var(--color-surface-alt);
    border-left: 4px solid var(--color-accent-blue);
    border-radius: 8px;
  }

  .next-step h2 {
    margin-top: 0;
  }

  .next-step p {
    max-width: 65ch;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 768px) {
    .hero h2 {
      font-size: 1.5rem;
    }
  }
</style>
