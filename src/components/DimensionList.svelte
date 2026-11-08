<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import type { Dimension } from '../types';
  import { levelColor, levelLabel } from '../lib/maturity';

  const dispatch = createEventDispatcher();

  let dimensions: Dimension[] = [];

  const unsubscribe = assessmentStore.subscribe((assessment) => {
    dimensions = assessment.dimensions;
  });

  onDestroy(unsubscribe);

  function selectDimension(dimensionId: string) {
    dispatch('selectDimension', dimensionId);
  }

  function getCompletionInfo(dimension: Dimension) {
    const applicable = dimension.proofPoints.filter((p) => !p.notApplicable);
    const completed = applicable.filter((p) => p.status === 'completed');
    return { completed: completed.length, total: applicable.length };
  }
</script>

<section class="dimension-list" aria-labelledby="dimensions-heading">
  <h2 id="dimensions-heading">Assessment Dimensions</h2>
  <p class="subtitle">Select a dimension to begin or continue your assessment.</p>

  <div class="dimensions-grid">
    {#each dimensions as dimension}
      {@const completion = getCompletionInfo(dimension)}
      <article class="dimension-card">
        <div class="dimension-header">
          <h3>
            <button
              on:click={() => selectDimension(dimension.id)}
              class="dimension-title-btn"
              aria-label="Assess {dimension.name}"
            >
              {dimension.name}
              <span class="chev" aria-hidden="true">→</span>
            </button>
          </h3>
          <span class="maturity-badge" style="background-color: {levelColor(dimension.maturityLevel)}">
            <span class="sr-only">Maturity level: </span>{levelLabel(dimension.maturityLevel)}
          </span>
        </div>

        <p class="dimension-description">{dimension.description}</p>

        <p class="dimension-stats">
          <span class="stat-label">Proof points complete</span>
          <span class="stat-value">{completion.completed} of {completion.total}</span>
        </p>
        <div class="progress-mini" aria-hidden="true">
          <div
            class="progress-mini-bar"
            style="width: {completion.total > 0 ? (completion.completed / completion.total) * 100 : 0}%"
          ></div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .dimension-list {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--color-text-muted);
    margin-bottom: 2rem;
  }

  .dimensions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.5rem;
  }

  .dimension-card {
    background: var(--color-surface);
    border: 1px solid var(--color-card-border);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .dimension-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  }

  .dimension-card:focus-within {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }

  .dimension-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  h3 {
    margin: 0;
    flex: 1 1 12rem;
  }

  .dimension-title-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-link);
    text-align: left;
    padding: 0.25rem 0;
    cursor: pointer;
    font-family: inherit;
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }

  .dimension-title-btn:hover {
    text-decoration-thickness: 2px;
  }

  .chev {
    margin-left: 0.25rem;
  }

  .maturity-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .dimension-description {
    color: var(--color-text-muted);
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
  }

  .dimension-stats {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .stat-label {
    color: var(--color-text-muted);
  }

  .stat-value {
    font-weight: 600;
    color: var(--color-heading);
  }

  .progress-mini {
    height: 0.5rem;
    background-color: var(--color-progress-track);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-mini-bar {
    height: 100%;
    background-color: var(--color-accent-blue);
  }

  @media (max-width: 768px) {
    .dimensions-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
