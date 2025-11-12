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
  
  <main id="main-content" class="container">
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
        Based on the <a href="https://www.w3.org/TR/maturity-model/" target="_blank" rel="noopener">
          W3C Accessibility Maturity Model
        </a>
      </p>
      <p>
        <small>
          This tool helps organizations assess their accessibility maturity across 7 dimensions.
          Data is stored locally in your browser.
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
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 2rem 0;
    margin-top: 4rem;
  }

  .footer a {
    color: #3498db;
  }

  .footer p {
    margin-bottom: 0.5rem;
  }

  .footer small {
    opacity: 0.8;
  }
</style>
