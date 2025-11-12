<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';
  import { MATURITY_LEVELS } from '../types';
  import type { Dimension } from '../types';

  const dispatch = createEventDispatcher();

  let dimensions: Dimension[] = [];

  assessmentStore.subscribe(assessment => {
    dimensions = assessment.dimensions;
  });

  function selectDimension(dimensionId: string) {
    dispatch('selectDimension', dimensionId);
  }

  function getMaturityLevelColor(level: string | null) {
    if (!level) return '#95a5a6';
    switch (level) {
      case 'inactive': return '#e74c3c';
      case 'launch': return '#f39c12';
      case 'integrate': return '#3498db';
      case 'optimize': return '#27ae60';
      default: return '#95a5a6';
    }
  }

  function getMaturityLevelLabel(level: string | null) {
    if (!level) return 'Not Assessed';
    const found = MATURITY_LEVELS.find(m => m.level === level);
    return found ? found.label : 'Unknown';
  }

  function getCompletionInfo(dimension: Dimension) {
    const applicable = dimension.proofPoints.filter(p => !p.notApplicable);
    const completed = applicable.filter(p => p.completed);
    return { completed: completed.length, total: applicable.length };
  }
</script>

<section class="dimension-list" aria-labelledby="dimensions-heading">
  <h2 id="dimensions-heading">Assessment Dimensions</h2>
  <p class="subtitle">Select a dimension to begin or continue your assessment</p>

  <div class="dimensions-grid">
    {#each dimensions as dimension}
      {@const completion = getCompletionInfo(dimension)}
      {@const maturityColor = getMaturityLevelColor(dimension.maturityLevel)}
      {@const maturityLabel = getMaturityLevelLabel(dimension.maturityLevel)}
      
      <article class="dimension-card">
        <div class="dimension-header">
          <h3>
            <button 
              on:click={() => selectDimension(dimension.id)}
              class="dimension-title-btn"
              aria-label="Assess {dimension.name}"
            >
              {dimension.name}
            </button>
          </h3>
          <div 
            class="maturity-badge" 
            style="background-color: {maturityColor}"
            role="status"
            aria-label="Maturity level: {maturityLabel}"
          >
            {maturityLabel}
          </div>
        </div>

        <p class="dimension-description">{dimension.description}</p>

        <div class="dimension-stats">
          <div class="stat">
            <span class="stat-label">Proof Points:</span>
            <span class="stat-value">{completion.completed}/{completion.total}</span>
          </div>
          <div class="progress-mini">
            <div 
              class="progress-mini-bar" 
              style="width: {completion.total > 0 ? (completion.completed / completion.total) * 100 : 0}%"
            ></div>
          </div>
        </div>

        <button 
          on:click={() => selectDimension(dimension.id)}
          class="btn btn-assess"
        >
          {dimension.maturityLevel ? 'Continue' : 'Start'} Assessment
        </button>
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
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #7f8c8d;
    margin-bottom: 2rem;
  }

  .dimensions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .dimension-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }

  .dimension-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .dimension-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  h3 {
    margin: 0;
    flex: 1;
  }

  .dimension-title-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    text-align: left;
    padding: 0;
    cursor: pointer;
    transition: color 0.2s;
  }

  .dimension-title-btn:hover {
    color: #3498db;
  }

  .maturity-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .dimension-description {
    color: #555;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
  }

  .dimension-stats {
    margin-bottom: 1rem;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .stat-label {
    color: #7f8c8d;
  }

  .stat-value {
    font-weight: 600;
    color: #2c3e50;
  }

  .progress-mini {
    height: 6px;
    background-color: #ecf0f1;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-mini-bar {
    height: 100%;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
  }

  .btn-assess {
    background-color: #3498db;
    color: white;
  }

  .btn-assess:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    .dimensions-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
