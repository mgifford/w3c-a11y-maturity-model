<script lang="ts">
  import Header from './components/Header.svelte';
  import SiteFooter from './components/SiteFooter.svelte';
  import OrganizationInfo from './components/OrganizationInfo.svelte';
  import ProgressTracker from './components/ProgressTracker.svelte';
  import DimensionList from './components/DimensionList.svelte';
  import DimensionDetail from './components/DimensionDetail.svelte';
  import Summary from './components/Summary.svelte';
  import MaturityVisualization from './components/MaturityVisualization.svelte';

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

<div class="page">
  <Header />

  <main id="main-content" class="container" tabindex="-1">
    <OrganizationInfo />
    <ProgressTracker {currentView} on:showSummary={showSummary} />

    {#if currentView === 'overview'}
      <MaturityVisualization />
      <DimensionList on:selectDimension={selectDimension} />
    {:else if currentView === 'dimension' && selectedDimensionId}
      <DimensionDetail dimensionId={selectedDimensionId} on:back={backToOverview} />
    {:else if currentView === 'summary'}
      <Summary on:back={backToOverview} />
    {/if}
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

  main {
    flex: 1;
    padding: 2rem 1rem;
  }

  main:focus {
    outline: none;
  }
</style>
