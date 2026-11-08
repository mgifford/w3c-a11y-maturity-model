<script lang="ts">
  import { assessmentStore, progress } from './stores/assessmentStore';
  import Header from './components/Header.svelte';
  import Introduction from './components/Introduction.svelte';
  import OrganizationInfo from './components/OrganizationInfo.svelte';
  import ProgressTracker from './components/ProgressTracker.svelte';
  import DimensionList from './components/DimensionList.svelte';
  import DimensionDetail from './components/DimensionDetail.svelte';
  import Summary from './components/Summary.svelte';
  import MaturityVisualization from './components/MaturityVisualization.svelte';
  import { MODEL } from './lib/maturity';
  import './app.css';

  let currentView: 'overview' | 'dimension' | 'summary' = 'overview';
  let selectedDimensionId: string | null = null;

  function selectDimension(event: CustomEvent<string>) {
    selectedDimensionId = event.detail;
    currentView = 'dimension';
  }

  function backToOverview() {
    currentView = 'overview';
    selectedDimensionId = null;
  }

  function showSummary() {
    currentView = 'summary';
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="app">
  <Header />
  
  <main id="main-content" class="container" tabindex="-1">
    <Introduction />
    <OrganizationInfo />
    <ProgressTracker {currentView} on:showSummary={showSummary} />
    
    {#if currentView === 'overview'}
      <MaturityVisualization />
      <DimensionList on:selectDimension={selectDimension} />
    {:else if currentView === 'dimension' && selectedDimensionId}
      <DimensionDetail 
        dimensionId={selectedDimensionId} 
        on:back={backToOverview} 
      />
    {:else if currentView === 'summary'}
      <Summary on:back={backToOverview} />
    {/if}
  </main>

  <footer class="footer">
    <div class="container">
      <p>
        Based on the <a href={MODEL.url} target="_blank" rel="noopener noreferrer">
          {MODEL.name}
          <span class="sr-only">(opens in a new tab)</span>
        </a>, published by the {MODEL.publisher} as a {MODEL.version}.
      </p>
      <p>
        <small>
          This is an independent tool. It is not a W3C product and is not endorsed by W3C or its
          Members.
        </small>
      </p>
      <p>
        <small>
          Results are informational and advisory: not a conformance claim, audit, or certification.
          Answers are stored only in this browser.
        </small>
      </p>
      <p>
        <small>
          Open source, with contributions welcome on
          <a href="https://github.com/mgifford/w3c-a11y-maturity-model" target="_blank" rel="noopener noreferrer">
            GitHub
            <span class="sr-only">(opens in a new tab)</span>
          </a>.
        </small>
      </p>
    </div>
  </footer>
</div>

<style>
  .app {
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

  main {
    flex: 1;
    padding: 2rem 1rem;
  }

  .footer {
    background-color: var(--color-footer-bg);
    color: var(--color-footer-text);
    padding: 2rem 0;
    margin-top: 4rem;
  }

  .footer a {
    color: var(--color-footer-link);
  }

  .footer p {
    margin-bottom: 0.5rem;
  }

  .footer small {
    color: var(--color-footer-text);
    font-size: 0.9rem;
  }
</style>
