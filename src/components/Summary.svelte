<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';
  import type { Assessment, Dimension } from '../types';
  import MaturityVisualization from './MaturityVisualization.svelte';
  import { levelColor, levelLabel, MODEL } from '../lib/maturity';

  const dispatch = createEventDispatcher();

  let assessment: Assessment;
  
  assessmentStore.subscribe(a => {
    assessment = a;
  });

  function goBack() {
    dispatch('back');
  }

  function exportPDF() {
    window.print();
  }

  function exportJSON() {
    const data = assessmentStore.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${assessment.organizationName || 'organization'}-a11y-assessment-${assessment.assessmentDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getCompletedProofPoints(dimension: Dimension) {
    const applicable = dimension.proofPoints.filter(p => !p.notApplicable);
    const completed = applicable.filter(p => p.status === 'completed');
    return { completed: completed.length, total: applicable.length };
  }

</script>

<section class="summary" aria-labelledby="summary-heading">
  <div class="summary-header no-print">
    <button on:click={goBack} class="btn-back" aria-label="Back to dimension list">
      ← Back to Overview
    </button>
  </div>

  <div class="summary-content">
    <h2 id="summary-heading">Assessment Summary Report</h2>

    <div class="report-info">
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Organization:</span>
          <span class="info-value">{assessment.organizationName || 'Not specified'}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Assessment Date:</span>
          <span class="info-value">{assessment.assessmentDate}</span>
        </div>
        {#if assessment.assessors.length > 0}
          <div class="info-item full-width">
            <span class="info-label">Assessment Team:</span>
            <span class="info-value">{assessment.assessors.join(', ')}</span>
          </div>
        {/if}
      </div>
    </div>

    <div class="report-note">
      <h3>How to read this report</h3>
      <p>
        The Accessibility Maturity Model assesses maturity <strong>per dimension</strong> and defines
        no overall organizational maturity level, so this report does not combine dimensions into a
        single score or grade.
      </p>
      <p>
        Levels are cumulative: a dimension reaches a higher level only once the outcomes at the lower
        levels are met. Results are informational and advisory, and are not an accessibility
        conformance claim, audit, or certification.
      </p>
      <p><strong>{assessment.dimensions.filter((d) => d.maturityLevel).length} of {assessment.dimensions.length}</strong> dimensions assessed.</p>
      <p class="report-version">
        Assessed against the {MODEL.name}: {MODEL.version}, with editor's-draft changes through
        {MODEL.syncedThrough}.
      </p>
    </div>

    <div class="dimensions-summary">
      <h3>Dimensions Assessment</h3>
      <!-- Scrollable region: tabindex makes the overflow reachable by keyboard -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div class="dimensions-table" role="region" aria-label="Dimensions assessment table" tabindex="0">
        <table>
          <caption>Maturity level and proof point completion by dimension</caption>
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col">Maturity Level</th>
              <th scope="col">Proof Points</th>
              <th scope="col">Completion</th>
            </tr>
          </thead>
          <tbody>
            {#each assessment.dimensions as dimension}
              {@const completion = getCompletedProofPoints(dimension)}
              {@const percentage = completion.total > 0 ? Math.round((completion.completed / completion.total) * 100) : 0}
              <tr>
                <td class="dimension-name">{dimension.name}</td>
                <td>
                  <span 
                    class="maturity-badge-small" 
                    style="background-color: {levelColor(dimension.maturityLevel)}"
                  >
                    {levelLabel(dimension.maturityLevel)}
                  </span>
                </td>
                <td class="proof-points-col">
                  {completion.completed}/{completion.total}
                </td>
                <td>
                  <div class="table-progress">
                    <div class="table-progress-bar" style="width: {percentage}%"></div>
                  </div>
                  <span class="progress-text">{percentage}%</span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div class="detailed-findings">
      <h3>Detailed Findings</h3>
      {#each assessment.dimensions as dimension}
        {@const completion = getCompletedProofPoints(dimension)}
        <div class="dimension-section">
          <h4>
            {dimension.name}
            <span 
              class="maturity-badge-inline" 
              style="background-color: {levelColor(dimension.maturityLevel)}"
            >
              {levelLabel(dimension.maturityLevel)}
            </span>
          </h4>
          
          <div class="dimension-stats-detail">
            <p><strong>Description:</strong> {dimension.description}</p>
            <p><strong>Proof Points Completed:</strong> {completion.completed} of {completion.total}</p>
          </div>

          {#if dimension.notes}
            <div class="dimension-notes">
              <h5>Notes:</h5>
              <p>{dimension.notes}</p>
            </div>
          {/if}

          <div class="proof-points-detail">
            <h5>Completed Proof Points:</h5>
            <ul>
              {#each dimension.proofPoints.filter(p => p.status === 'completed') as proofPoint}
                <li>
                  <strong>{proofPoint.category}:</strong> {proofPoint.description}
                  {#if proofPoint.evidence}
                    <div class="evidence-note">Evidence: {proofPoint.evidence}</div>
                  {/if}
                </li>
              {/each}
            </ul>
            {#if dimension.proofPoints.filter(p => p.status === 'completed').length === 0}
              <p class="no-items">No proof points completed yet.</p>
            {/if}
          </div>

          {#if dimension.proofPoints.filter(p => p.status === 'in-progress').length > 0}
            <div class="in-progress-list">
              <h5>In Progress:</h5>
              <ul>
                {#each dimension.proofPoints.filter(p => p.status === 'in-progress') as proofPoint}
                  <li>{proofPoint.category}: {proofPoint.description}</li>
                {/each}
              </ul>
            </div>
          {/if}

          {#if dimension.proofPoints.filter(p => p.status === 'planned').length > 0}
            <div class="planned-list">
              <h5>Planned:</h5>
              <ul>
                {#each dimension.proofPoints.filter(p => p.status === 'planned') as proofPoint}
                  <li>{proofPoint.category}: {proofPoint.description}</li>
                {/each}
              </ul>
            </div>
          {/if}

          {#if dimension.proofPoints.filter(p => p.notApplicable).length > 0}
            <div class="not-applicable-list">
              <h5>Not Applicable Proof Points:</h5>
              <ul>
                {#each dimension.proofPoints.filter(p => p.notApplicable) as proofPoint}
                  <li>{proofPoint.category}: {proofPoint.description}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if assessment.overallNotes}
      <div class="overall-notes">
        <h3>Overall Notes</h3>
        <p>{assessment.overallNotes}</p>
      </div>
    {/if}
  </div>

  <div class="action-buttons no-print">
    <button on:click={exportJSON} class="btn btn-secondary">
      <span aria-hidden="true">📥</span> Export as JSON
    </button>
    <button on:click={exportPDF} class="btn btn-primary">
      <span aria-hidden="true">🖨️</span> Print/Save as PDF
    </button>
  </div>
</section>

<style>
  .summary {
    background: var(--color-surface);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .summary-header {
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
    transition: color 0.2s;
  }

  .btn-back:hover {
    color: var(--color-accent-blue-strong);
    text-decoration: underline;
  }


  h2 {
    font-size: 1.75rem;
    color: var(--color-heading);
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-border);
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-heading);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    color: var(--color-heading);
    margin: 1rem 0 0.5rem 0;
  }

  .report-info {
    background-color: var(--color-surface-alt);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-item.full-width {
    grid-column: 1 / -1;
  }

  .info-label {
    font-weight: 600;
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .info-value {
    color: var(--color-heading);
    font-size: 1.1rem;
  }

  .report-note {
    background-color: var(--color-surface-alt);
    border-left: 4px solid var(--color-accent-blue);
    color: var(--color-text);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .report-note h3 {
    margin-top: 0;
  }

  .report-note p {
    margin-bottom: 0.75rem;
    max-width: 70ch;
  }

  .report-note p:last-child {
    margin-bottom: 0;
  }

  .report-version {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  caption {
    caption-side: top;
    text-align: left;
    font-weight: 600;
    color: var(--color-text);
    padding-bottom: 0.75rem;
  }

  .dimensions-table {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  thead {
    background-color: var(--color-table-head-bg);
    color: var(--color-table-head-text);
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  tbody tr:hover {
    background-color: var(--color-surface-alt);
  }

  .dimension-name {
    font-weight: 500;
    color: var(--color-heading);
  }

  .maturity-badge-small {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
  }

  .maturity-badge-inline {
    padding: 0.375rem 0.875rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
  }

  .proof-points-col {
    text-align: center;
    font-weight: 600;
  }

  .table-progress {
    height: 8px;
    background-color: var(--color-progress-track);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }

  .table-progress-bar {
    height: 100%;
    background-color: var(--color-accent-blue);
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .dimension-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: var(--color-surface-alt);
    border-radius: 8px;
  }

  .dimension-stats-detail {
    margin-bottom: 1rem;
  }

  .dimension-stats-detail p {
    margin-bottom: 0.5rem;
    color: var(--color-text-muted);
  }

  .dimension-notes {
    background-color: var(--color-surface-alt);
    border-left: 4px solid var(--color-level-launch);
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
  }

  .dimension-notes p {
    color: var(--color-text);
    margin: 0;
  }

  .proof-points-detail ul,
  .not-applicable-list ul {
    list-style-type: none;
    padding: 0;
  }

  .proof-points-detail li,
  .not-applicable-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .proof-points-detail li:last-child,
  .not-applicable-list li:last-child {
    border-bottom: none;
  }

  .evidence-note {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-surface-alt);
    border-left: 3px solid var(--color-accent-blue);
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .no-items {
    color: var(--color-text-muted);
    font-style: italic;
  }

  .not-applicable-list {
    margin-top: 1rem;
  }

  .not-applicable-list h5 {
    color: var(--color-text-muted);
  }

  .not-applicable-list li {
    color: var(--color-text-muted);
  }

  .in-progress-list {
    margin-top: 1rem;
  }

  .in-progress-list h5 {
    color: var(--color-text);
  }

  .in-progress-list li {
    color: var(--color-text);
  }

  .planned-list {
    margin-top: 1rem;
  }

  .planned-list h5 {
    color: var(--color-text);
  }

  .planned-list li {
    color: var(--color-text);
  }

  .overall-notes {
    background-color: var(--color-surface-alt);
    padding: 1.5rem;
    border-radius: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid var(--color-border);
  }

  .btn {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background-color: var(--color-btn-secondary-bg);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--color-btn-secondary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .btn-secondary {
    background-color: #546475;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #435262;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  @media print {
    .no-print {
      display: none !important;
    }

    .summary {
      box-shadow: none;
      padding: 0;
    }

    .dimension-section {
      page-break-inside: avoid;
    }

    h2 {
      page-break-after: avoid;
    }
  }

  @media (max-width: 768px) {
    .summary {
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
      flex-direction: column;
      align-items: flex-start;
    }

    .action-buttons {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }

    table {
      font-size: 0.875rem;
    }

    th, td {
      padding: 0.5rem;
    }
  }
</style>
