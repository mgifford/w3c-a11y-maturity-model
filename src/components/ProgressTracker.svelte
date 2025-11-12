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
    if (!dimensions) return { completed: 0, total: 0, percentage: 0, applicable: 0 };
    
    let total = 0;
    let completed = 0;
    let applicable = 0;
    
    dimensions.forEach(dim => {
      dim.proofPoints.forEach(pp => {
        if (!pp.notApplicable) {
          applicable++;
          total++;
          if (pp.completed) completed++;
        }
      });
    });
    
    return {
      completed,
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
    <div class="progress-stats">
      <p class="progress-text" aria-live="polite">
        <strong>Dimensions:</strong> {completedCount} of {totalCount} assessed
      </p>
      <p class="progress-text proof-points" aria-live="polite">
        <strong>Proof Points:</strong> {proofPointStats.completed} of {proofPointStats.total} completed
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
    background: white;
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
    color: #2c3e50;
    margin: 0 0 0.75rem 0;
  }

  .progress-text {
    color: #555;
    font-size: 0.95rem;
    margin: 0;
  }

  .progress-text strong {
    color: #2c3e50;
  }

  .progress-section {
    margin-bottom: 1.5rem;
  }

  .progress-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .progress-bar-container {
    height: 24px;
    background-color: #ecf0f1;
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
    background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
  }

  .proof-point-bar {
    background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%);
  }

  .progress-percentage {
    text-align: right;
    margin-top: 0.25rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #7f8c8d;
  }

  .completion-banner {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    color: white;
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
    background-color: white;
    color: #27ae60;
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
