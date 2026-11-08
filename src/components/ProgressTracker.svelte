<script lang="ts">
  import { assessmentStore, progress } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';

  export let currentView: 'overview' | 'dimension' | 'summary';

  const dispatch = createEventDispatcher();

  $: completedCount = $progress.completed;
  $: totalCount = $progress.total;
  $: percentage = $progress.percentage;

  // Calculate proof point progress
  $: proofPointStats = (() => {
    const dimensions = $assessmentStore.dimensions;
    if (!dimensions) return { completed: 0, inProgress: 0, planned: 0, total: 0, percentage: 0, applicable: 0 };
    
    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let planned = 0;
    let applicable = 0;
    
    dimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        if (!pp.notApplicable) {
          applicable++;
          total++;
          if (pp.status === 'completed') completed++;
          else if (pp.status === 'in-progress') inProgress++;
          else if (pp.status === 'planned') planned++;
        }
      });
    });
    
    return {
      completed,
      inProgress,
      planned,
      total,
      applicable,
      percentage: total > 0 ? (completed / total) * 100 : 0
    };
  })();

  function showSummary() {
    dispatch('showSummary');
  }
</script>

<section class="progress-tracker" aria-labelledby="progress-heading">
  <div class="progress-header">
    <h2 id="progress-heading">Assessment Progress</h2>
    <!-- One polite live region: both figures update together when a level is set -->
    <div class="progress-stats" aria-live="polite">
      <p class="progress-text">
        <strong>Dimensions:</strong> {completedCount} of {totalCount} assessed
      </p>
      <p class="progress-text proof-points">
        <strong>Proof Points:</strong> {proofPointStats.completed} of {proofPointStats.total} completed
        {#if proofPointStats.inProgress > 0}
          · <span class="stat-in-progress">{proofPointStats.inProgress} in progress</span>
        {/if}
        {#if proofPointStats.planned > 0}
          · <span class="stat-planned">{proofPointStats.planned} planned</span>
        {/if}
      </p>
    </div>
  </div>

  <div class="progress-section">
    <div class="progress-label">Dimension Progress</div>
    <div class="progress-bar-container" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" aria-label="Dimension completion">
      <div class="progress-bar dimension-bar" style="width: {percentage}%"></div>
    </div>
    <div class="progress-percentage">{Math.round(percentage)}%</div>
  </div>

  <div class="progress-section">
    <div class="progress-label">Proof Point Progress</div>
    <div class="progress-bar-container" role="progressbar" aria-valuenow={proofPointStats.percentage} aria-valuemin="0" aria-valuemax="100" aria-label="Proof point completion">
      <div class="progress-bar proof-point-bar" style="width: {proofPointStats.percentage}%"></div>
    </div>
    <div class="progress-percentage">{Math.round(proofPointStats.percentage)}%</div>
  </div>

  {#if completedCount === totalCount && currentView !== 'summary'}
    <div class="completion-banner">
      <p>
        <strong>🎉 Congratulations!</strong> You've completed all dimensions.
      </p>
      <button on:click={showSummary} class="btn btn-primary">
        View Summary Report
      </button>
    </div>
  {/if}
</section>

<style>
  .progress-tracker {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .progress-header {
    margin-bottom: 1.5rem;
  }

  .progress-stats {
    display: flex;
    gap: 2rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }

  h2 {
    font-size: 1.5rem;
    color: var(--color-heading);
    margin: 0 0 0.75rem 0;
  }

  .progress-text {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    margin: 0;
  }

  .progress-text strong {
    color: var(--color-heading);
  }

  .stat-in-progress {
    color: var(--color-text);
    font-weight: 500;
  }

  .stat-planned {
    color: var(--color-text);
    font-weight: 500;
  }

  .progress-section {
    margin-bottom: 1.5rem;
  }

  .progress-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
  }

  .progress-bar-container {
    height: 24px;
    background-color: var(--color-progress-track);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.5s ease;
    border-radius: 12px;
    position: relative;
  }

  .dimension-bar {
    background: linear-gradient(90deg, var(--color-accent-blue) 0%, var(--color-accent-blue-strong) 100%);
  }

  .proof-point-bar {
    background: linear-gradient(90deg, var(--color-banner-from) 0%, var(--color-banner-to) 100%);
  }

  .progress-percentage {
    text-align: right;
    margin-top: 0.25rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  .completion-banner {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--color-banner-from) 0%, var(--color-banner-to) 100%);
    color: #ffffff;
    border-radius: 8px;
    text-align: center;
  }

  .completion-banner p {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: var(--color-surface);
    color: var(--color-accent-green);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    .progress-tracker {
      padding: 1.5rem;
    }

    .progress-header {
      flex-direction: column;
      align-items: flex-start;
    }

    h2 {
      font-size: 1.25rem;
    }
  }
</style>
