<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';
  import { MATURITY_LEVELS } from '../types';
  import type { Dimension, MaturityLevel } from '../types';

  export let dimensionId: string;

  const dispatch = createEventDispatcher();

  let dimension: Dimension | undefined;
  let groupedProofPoints: Record<string, typeof dimension.proofPoints> = {};

  assessmentStore.subscribe(assessment => {
    dimension = assessment.dimensions.find(d => d.id === dimensionId);
    if (dimension) {
      groupedProofPoints = dimension.proofPoints.reduce((acc, pp) => {
        if (!acc[pp.category]) {
          acc[pp.category] = [];
        }
        acc[pp.category].push(pp);
        return acc;
      }, {} as Record<string, typeof dimension.proofPoints>);
    }
  });

  function toggleProofPoint(proofPointId: string) {
    assessmentStore.toggleProofPoint(dimensionId, proofPointId);
  }

  function toggleNotApplicable(proofPointId: string) {
    assessmentStore.toggleNotApplicable(dimensionId, proofPointId);
  }

  function updateEvidence(proofPointId: string, evidence: string) {
    assessmentStore.updateProofPointEvidence(dimensionId, proofPointId, evidence);
  }

  function setMaturityLevel(level: MaturityLevel) {
    assessmentStore.setMaturityLevel(dimensionId, level);
  }

  function updateNotes(notes: string) {
    assessmentStore.updateDimension(dimensionId, { notes });
  }

  function goBack() {
    dispatch('back');
  }

  function getCompletionPercentage() {
    if (!dimension) return 0;
    const applicable = dimension.proofPoints.filter(p => !p.notApplicable);
    if (applicable.length === 0) return 0;
    const completed = applicable.filter(p => p.completed).length;
    return (completed / applicable.length) * 100;
  }
</script>

{#if dimension}
  <section class="dimension-detail" aria-labelledby="dimension-heading">
    <div class="detail-header">
      <button on:click={goBack} class="btn-back" aria-label="Back to dimension list">
        ← Back
      </button>
      <h2 id="dimension-heading">{dimension.name}</h2>
      <p class="dimension-desc">{dimension.description}</p>
    </div>

    <div class="completion-status" role="status" aria-live="polite">
      <span class="status-label">Completion:</span>
      <div class="mini-progress">
        <div class="mini-progress-bar" style="width: {getCompletionPercentage()}%"></div>
      </div>
      <span class="status-percent">{Math.round(getCompletionPercentage())}%</span>
    </div>

    <div class="maturity-selection" role="group" aria-labelledby="maturity-heading">
      <h3 id="maturity-heading">Select Maturity Level</h3>
      <p class="help-text">
        Based on your proof points, determine the current maturity level for this dimension.
      </p>
      <div class="maturity-options">
        {#each MATURITY_LEVELS as { level, label, description }}
          <label class="maturity-option {dimension.maturityLevel === level ? 'selected' : ''}">
            <input
              type="radio"
              name="maturity-{dimensionId}"
              value={level}
              checked={dimension.maturityLevel === level}
              on:change={() => setMaturityLevel(level)}
            />
            <div class="maturity-content">
              <span class="maturity-label">{label}</span>
              <span class="maturity-desc">{description}</span>
            </div>
          </label>
        {/each}
      </div>
    </div>

    <div class="proof-points-section">
      <h3>Proof Points</h3>
      <p class="help-text">
        Check off proof points that your organization has completed. Mark items as "Not Applicable" if they don't apply.
      </p>

      {#each Object.entries(groupedProofPoints) as [category, proofPoints]}
        <div class="proof-points-group">
          <h4 class="category-heading">{category}</h4>
          <div class="proof-points-list">
            {#each proofPoints as proofPoint}
              <div class="proof-point {proofPoint.notApplicable ? 'not-applicable' : ''}">
                <div class="proof-point-header">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      checked={proofPoint.completed}
                      disabled={proofPoint.notApplicable}
                      on:change={() => toggleProofPoint(proofPoint.id)}
                      aria-describedby="desc-{proofPoint.id}"
                    />
                    <span id="desc-{proofPoint.id}" class="proof-point-text">
                      {proofPoint.description}
                    </span>
                  </label>
                  <button
                    on:click={() => toggleNotApplicable(proofPoint.id)}
                    class="btn-na {proofPoint.notApplicable ? 'active' : ''}"
                    title="{proofPoint.notApplicable ? 'Mark as applicable' : 'Mark as not applicable'}"
                    aria-pressed={proofPoint.notApplicable}
                  >
                    N/A
                  </button>
                </div>
                {#if proofPoint.completed && !proofPoint.notApplicable}
                  <div class="evidence-section">
                    <label for="evidence-{proofPoint.id}" class="evidence-label">
                      Evidence/Documentation:
                    </label>
                    <textarea
                      id="evidence-{proofPoint.id}"
                      bind:value={proofPoint.evidence}
                      on:blur={() => updateEvidence(proofPoint.id, proofPoint.evidence)}
                      placeholder="Describe the evidence or documentation that supports this proof point..."
                      class="evidence-textarea"
                      rows="2"
                    ></textarea>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="notes-section">
      <label for="dimension-notes">
        <h3>Additional Notes</h3>
      </label>
      <textarea
        id="dimension-notes"
        bind:value={dimension.notes}
        on:blur={() => updateNotes(dimension.notes)}
        placeholder="Add any additional notes, observations, or action items for this dimension..."
        class="notes-textarea"
        rows="4"
      ></textarea>
    </div>

    <div class="action-buttons">
      <button on:click={goBack} class="btn btn-primary">
        Save and Return to Overview
      </button>
    </div>
  </section>
{:else}
  <div class="error">
    <p>Dimension not found.</p>
    <button on:click={goBack} class="btn btn-primary">Back to Overview</button>
  </div>
{/if}

<style>
  .dimension-detail {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .detail-header {
    margin-bottom: 2rem;
  }

  .btn-back {
    background: none;
    border: none;
    color: #3498db;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .btn-back:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .dimension-desc {
    color: #555;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .completion-status {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 2rem;
  }

  .status-label {
    font-weight: 600;
    color: #2c3e50;
  }

  .mini-progress {
    flex: 1;
    height: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
    overflow: hidden;
  }

  .mini-progress-bar {
    height: 100%;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  .status-percent {
    font-weight: 600;
    color: #2c3e50;
    min-width: 3rem;
    text-align: right;
  }

  .maturity-selection {
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .help-text {
    color: #7f8c8d;
    margin-bottom: 1rem;
  }

  .maturity-options {
    display: grid;
    gap: 1rem;
  }

  .maturity-option {
    display: flex;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .maturity-option:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
  }

  .maturity-option.selected {
    border-color: #3498db;
    background-color: #e3f2fd;
  }

  .maturity-option input[type="radio"] {
    margin-right: 1rem;
    cursor: pointer;
  }

  .maturity-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .maturity-label {
    font-weight: 600;
    color: #2c3e50;
  }

  .maturity-desc {
    font-size: 0.9rem;
    color: #555;
  }

  .proof-points-section {
    margin-bottom: 2rem;
  }

  .proof-points-group {
    margin-bottom: 2rem;
  }

  .category-heading {
    background-color: #34495e;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .proof-points-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .proof-point {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    transition: background-color 0.2s;
  }

  .proof-point:hover {
    background-color: #f8f9fa;
  }

  .proof-point.not-applicable {
    opacity: 0.6;
    background-color: #f8f9fa;
  }

  .proof-point-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    flex: 1;
  }

  .checkbox-label input[type="checkbox"] {
    margin-top: 0.25rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  .proof-point-text {
    flex: 1;
    line-height: 1.5;
    color: #2c3e50;
  }

  .btn-na {
    padding: 0.25rem 0.75rem;
    border: 1px solid #95a5a6;
    background-color: white;
    color: #7f8c8d;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .btn-na:hover {
    border-color: #7f8c8d;
    background-color: #f8f9fa;
  }

  .btn-na.active {
    background-color: #95a5a6;
    color: white;
    border-color: #95a5a6;
  }

  .evidence-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .evidence-label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  .evidence-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
    transition: border-color 0.2s;
  }

  .evidence-textarea:hover {
    border-color: #bbb;
  }

  .evidence-textarea:focus {
    border-color: #3498db;
  }

  .notes-section {
    margin-bottom: 2rem;
  }

  .notes-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.2s;
  }

  .notes-textarea:hover {
    border-color: #bbb;
  }

  .notes-textarea:focus {
    border-color: #3498db;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .error {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }

  .error p {
    color: #e74c3c;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .dimension-detail {
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .proof-point-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .btn-na {
      align-self: flex-start;
    }
  }
</style>
