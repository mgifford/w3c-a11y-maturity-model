<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';
  import { MATURITY_LEVELS } from '../types';
  import type { Dimension, MaturityLevel, ProofPoint, ProofPointStatus } from '../types';

  export let dimensionId: string;

  const dispatch = createEventDispatcher();

  let dimension: Dimension | undefined;
  let groupedProofPoints: Record<string, ProofPoint[]> = {};

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

  function setProofPointStatus(proofPointId: string, newStatus: ProofPointStatus) {
    // Clicking the already-active status button resets to 'not-started'
    const proofPoint = dimension?.proofPoints.find(p => p.id === proofPointId);
    const nextStatus: ProofPointStatus = proofPoint?.status === newStatus ? 'not-started' : newStatus;
    assessmentStore.setProofPointStatus(dimensionId, proofPointId, nextStatus);
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

  // Derived rather than computed in the template: these must update when the
  // store replaces the dimension object.
  $: applicableProofPoints = dimension
    ? dimension.proofPoints.filter((proofPoint) => !proofPoint.notApplicable)
    : [];
  $: completedApplicable = applicableProofPoints.filter(
    (proofPoint) => proofPoint.status === 'completed'
  ).length;
  $: completionPercentage =
    applicableProofPoints.length > 0 ? (completedApplicable / applicableProofPoints.length) * 100 : 0;

  const STATUS_CONFIG: { value: ProofPointStatus; label: string; ariaLabel: string }[] = [
    { value: 'planned',     label: 'Planned',     ariaLabel: 'Mark as planned' },
    { value: 'in-progress', label: 'In Progress', ariaLabel: 'Mark as in progress' },
    { value: 'completed',   label: 'Completed',   ariaLabel: 'Mark as completed' },
  ];
</script>

{#if dimension}
  {@const dim = dimension}
  {@const incompleteApplicable = dim.proofPoints.filter(
    (proofPoint) => !proofPoint.notApplicable && proofPoint.status !== 'completed'
  ).length}
  <section class="dimension-detail" aria-labelledby="dimension-heading">
    <div class="detail-header">
      <button on:click={goBack} class="btn-back">
        <span aria-hidden="true">&#8592;</span> Back to overview
      </button>
      <h2 id="dimension-heading">{dim.name}</h2>
      <p class="dimension-desc">{dim.description}</p>
    </div>

    <div class="completion-status">
      <span class="status-label">Completion</span>
      <div class="mini-progress" aria-hidden="true">
        <div class="mini-progress-bar" style="width: {completionPercentage}%"></div>
      </div>
      <span class="status-percent" role="status" aria-live="polite">
        {Math.round(completionPercentage)}% complete
      </span>
    </div>

    <div class="maturity-selection" role="group" aria-labelledby="maturity-heading">
      <h3 id="maturity-heading">Maturity level</h3>
      <p class="help-text" id="maturity-help">
        Choose the highest level your evidence supports. Levels are cumulative, so the outcomes at
        lower levels should be met first.
      </p>
      <div class="maturity-options" aria-describedby="maturity-help">
        {#each MATURITY_LEVELS as { level, label, description }}
          <div class="maturity-option {dim.maturityLevel === level ? 'selected' : ''}">
            <input
              type="radio"
              id="maturity-{dimensionId}-{level}"
              name="maturity-{dimensionId}"
              value={level}
              checked={dim.maturityLevel === level}
              on:change={() => setMaturityLevel(level)}
            />
            <label for="maturity-{dimensionId}-{level}">
              <span class="maturity-label">{label}</span>
              <span class="maturity-desc">{description}</span>
            </label>
          </div>
        {/each}
      </div>

      {#if dim.maturityLevel === 'optimize' && incompleteApplicable > 0}
        <p class="level-warning" role="status">
          The model requires every applicable proof point to be fully complete at Optimize.
          {incompleteApplicable}
          {incompleteApplicable === 1 ? 'proof point is' : 'proof points are'} still open.
        </p>
      {/if}
    </div>

    <div class="proof-points-section">
      <h3>Proof points</h3>
      <p class="help-text">
        Record the status of each proof point, and mark items as not applicable when they do not apply
        to your organization. The model asks you to mark these as N/A rather than removing them.
      </p>

      {#each Object.entries(groupedProofPoints) as [category, proofPoints]}
        <div class="proof-points-group">
          <h4 class="category-heading">{category}</h4>
          <div class="proof-points-list">
            {#each proofPoints as proofPoint}
              <div
                class="proof-point status-{proofPoint.status} {proofPoint.notApplicable ? 'not-applicable' : ''}"
              >
                <div class="proof-point-header">
                  <span id="desc-{proofPoint.id}" class="proof-point-text">
                    {proofPoint.description}
                  </span>
                  <button
                    on:click={() => toggleNotApplicable(proofPoint.id)}
                    class="btn-na {proofPoint.notApplicable ? 'active' : ''}"
                    aria-pressed={proofPoint.notApplicable}
                  >
                    {proofPoint.notApplicable ? 'Applicable' : 'Not applicable'}
                  </button>
                </div>

                {#if proofPoint.notApplicable}
                  <p class="na-note">Marked not applicable. Status options are paused.</p>
                {:else}
                  <div
                    class="status-buttons"
                    role="group"
                    aria-label="Status for: {proofPoint.description}"
                  >
                    {#each STATUS_CONFIG as cfg}
                      <button
                        class="btn-status btn-status--{cfg.value} {proofPoint.status === cfg.value
                          ? 'active'
                          : ''}"
                        on:click={() => setProofPointStatus(proofPoint.id, cfg.value)}
                        aria-pressed={proofPoint.status === cfg.value}
                      >
                        {cfg.label}
                      </button>
                    {/each}
                  </div>

                  {#if proofPoint.status === 'completed'}
                    <div class="evidence-section">
                      <label for="evidence-{proofPoint.id}" class="evidence-label">
                        Evidence or documentation
                      </label>
                      <textarea
                        id="evidence-{proofPoint.id}"
                        bind:value={proofPoint.evidence}
                        on:blur={() => updateEvidence(proofPoint.id, proofPoint.evidence)}
                        placeholder="Describe the evidence that supports this proof point"
                        class="evidence-textarea"
                        rows="2"
                      ></textarea>
                    </div>
                  {/if}
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="notes-section">
      <h3 id="dimension-notes-heading">Additional notes</h3>
      <p class="help-text" id="dimension-notes-help">
        Anything else that should be recorded for this dimension.
      </p>
      <textarea
        id="dimension-notes"
        aria-labelledby="dimension-notes-heading"
        aria-describedby="dimension-notes-help"
        bind:value={dim.notes}
        on:blur={() => updateNotes(dim.notes)}
        placeholder="Add notes, observations, or action items for this dimension"
        class="notes-textarea"
        rows="4"
      ></textarea>
    </div>

    <div class="action-buttons">
      <button on:click={goBack} class="btn btn-primary">Save and return to overview</button>
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
    background: var(--color-surface);
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
    color: var(--color-accent-blue);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .btn-back:hover {
    color: var(--color-accent-blue-strong);
    text-decoration: underline;
  }

  h2 {
    font-size: 2rem;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
  }

  .dimension-desc {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .completion-status {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-surface-alt);
    border-radius: 6px;
    margin-bottom: 2rem;
  }

  .status-label {
    font-weight: 600;
    color: var(--color-heading);
  }

  .mini-progress {
    flex: 1;
    height: 10px;
    background-color: var(--color-progress-track);
    border-radius: 5px;
    overflow: hidden;
  }

  .mini-progress-bar {
    height: 100%;
    background-color: var(--color-accent-blue);
    transition: width 0.3s ease;
  }

  .status-percent {
    font-weight: 600;
    color: var(--color-heading);
    min-width: 3rem;
    text-align: right;
  }

  .maturity-selection {
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1.1rem;
    color: var(--color-heading);
    margin-bottom: 1rem;
  }

  .help-text {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }

  .maturity-options {
    display: grid;
    gap: 1rem;
  }

  .maturity-option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
  }

  .maturity-option:hover {
    border-color: var(--color-accent-blue);
    background-color: var(--color-surface-alt);
  }

  .maturity-option.selected {
    border-color: var(--color-accent-blue);
    background-color: var(--color-surface-alt);
    box-shadow: inset 4px 0 0 var(--color-accent-blue);
  }

  .maturity-option input[type='radio'] {
    margin-top: 0.35rem;
    width: 1.15rem;
    height: 1.15rem;
    flex: none;
    cursor: pointer;
  }

  .maturity-option label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    cursor: pointer;
    flex: 1;
  }

  .maturity-label {
    font-weight: 600;
    color: var(--color-heading);
  }

  .maturity-desc {
    font-size: 0.95rem;
    color: var(--color-text-muted);
  }

  .level-warning {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-left: 4px solid var(--color-level-launch);
    background-color: var(--color-surface-alt);
    color: var(--color-text);
    border-radius: 4px;
  }

  .na-note {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    color: var(--color-text-muted);
  }

  .proof-points-section {
    margin-bottom: 2rem;
  }

  .proof-points-group {
    margin-bottom: 2rem;
  }

  .category-heading {
    background-color: var(--color-heading);
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
    background-color: var(--color-surface);
    transition: background-color 0.2s, border-color 0.2s;
  }

  .proof-point:hover {
    background-color: var(--color-surface-alt);
  }

  .proof-point.not-applicable {
    background-color: var(--color-surface-alt);
  }

  .proof-point.not-applicable .proof-point-text {
    color: var(--color-text-muted);
  }

  /* Subtle left-border tint per status */
  .proof-point.status-planned {
    border-left: 4px solid var(--color-accent-blue);
  }

  .proof-point.status-in-progress {
    border-left: 4px solid var(--color-level-launch);
  }

  .proof-point.status-completed {
    border-left: 4px solid var(--color-level-optimize);
  }

  .proof-point-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .proof-point-text {
    flex: 1;
    line-height: 1.5;
    color: var(--color-heading);
  }

  /* Status buttons row */
  .status-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .btn-status {
    padding: 0.35rem 0.9rem;
    border: 2px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-status:hover {
    border-color: var(--color-accent-blue);
    background-color: var(--color-surface-alt);
  }

  /* Planned – blue */
  .btn-status--planned.active {
    background-color: var(--color-accent-blue);
    border-color: var(--color-accent-blue);
    color: #ffffff;
  }

  /* In Progress – amber */
  .btn-status--in-progress.active {
    background-color: var(--color-level-launch);
    border-color: var(--color-level-launch);
    color: #ffffff;
  }

  /* Completed – green */
  .btn-status--completed.active {
    background-color: var(--color-level-optimize);
    border-color: var(--color-level-optimize);
    color: #ffffff;
  }

  .btn-na {
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text-muted);
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .btn-na:hover {
    border-color: var(--color-accent-blue);
    background-color: var(--color-surface-alt);
  }

  .btn-na.active {
    background-color: var(--color-level-none);
    color: #ffffff;
    border-color: var(--color-level-none);
  }

  .evidence-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }

  .evidence-label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--color-heading);
  }

  .evidence-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.95rem;
    resize: vertical;
    transition: border-color 0.2s;
  }

  .evidence-textarea:hover {
    border-color: var(--color-accent-blue);
  }

  .evidence-textarea:focus {
    border-color: var(--color-accent-blue);
  }

  .notes-section {
    margin-bottom: 2rem;
  }

  .notes-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.2s;
  }

  .notes-textarea:hover {
    border-color: var(--color-accent-blue);
  }

  .notes-textarea:focus {
    border-color: var(--color-accent-blue);
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
    background-color: var(--color-accent-blue);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--color-accent-blue-strong);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .error {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }

  .error p {
    color: var(--color-level-inactive);
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
