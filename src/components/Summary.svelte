<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';
  import { createEventDispatcher } from 'svelte';
  import { MATURITY_LEVELS } from '../types';
  import type { Assessment, Dimension } from '../types';
  import MaturityVisualization from './MaturityVisualization.svelte';

  const dispatch = createEventDispatcher();

  let assessment: Assessment;
  
  assessmentStore.subscribe(a => {
    assessment = a;
  });

  function goBack() {
    dispatch('back');
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

  function getOverallMaturity() {
    const assessed = assessment.dimensions.filter(d => d.maturityLevel);
    if (assessed.length === 0) return null;
    
    const levelScores = { inactive: 0, launch: 1, integrate: 2, optimize: 3 };
    const totalScore = assessed.reduce((sum, d) => {
      return sum + (levelScores[d.maturityLevel!] || 0);
    }, 0);
    
    const avgScore = totalScore / assessed.length;
    
    if (avgScore < 0.5) return 'inactive';
    if (avgScore < 1.5) return 'launch';
    if (avgScore < 2.5) return 'integrate';
    return 'optimize';
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
    const completed = applicable.filter(p => p.completed);
    return { completed: completed.length, total: applicable.length };
  }

  $: overallMaturity = getOverallMaturity();
</script>

<section class="summary" aria-labelledby="summary-heading">
  <div class="summary-header no-print">
    <button on:click={goBack} class="btn-back" aria-label="Back to dimension list">
      ← Back to Overview
    </button>
  </div>

  <div class="summary-content">
    <h1 id="summary-heading">Assessment Summary Report</h1>

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

    {#if overallMaturity}
      <div class="overall-maturity">
        <h2>Overall Maturity Level</h2>
        <div 
          class="maturity-badge-large" 
          style="background-color: {getMaturityLevelColor(overallMaturity)}"
        >
          {getMaturityLevelLabel(overallMaturity)}
        </div>
        <p class="maturity-explanation">
          Based on the average maturity across all assessed dimensions.
        </p>
      </div>
    {/if}

    <MaturityVisualization />

    <div class="dimensions-summary">
      <h2>Dimensions Assessment</h2>
      <div class="dimensions-table">
        <table>
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
                    style="background-color: {getMaturityLevelColor(dimension.maturityLevel)}"
                  >
                    {getMaturityLevelLabel(dimension.maturityLevel)}
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
      <h2>Detailed Findings</h2>
      {#each assessment.dimensions as dimension}
        {@const completion = getCompletedProofPoints(dimension)}
        <div class="dimension-section">
          <h3>
            {dimension.name}
            <span 
              class="maturity-badge-inline" 
              style="background-color: {getMaturityLevelColor(dimension.maturityLevel)}"
            >
              {getMaturityLevelLabel(dimension.maturityLevel)}
            </span>
          </h3>
          
          <div class="dimension-stats-detail">
            <p><strong>Description:</strong> {dimension.description}</p>
            <p><strong>Proof Points Completed:</strong> {completion.completed} of {completion.total}</p>
          </div>

          {#if dimension.notes}
            <div class="dimension-notes">
              <h4>Notes:</h4>
              <p>{dimension.notes}</p>
            </div>
          {/if}

          <div class="proof-points-detail">
            <h4>Completed Proof Points:</h4>
            <ul>
              {#each dimension.proofPoints.filter(p => p.completed) as proofPoint}
                <li>
                  <strong>{proofPoint.category}:</strong> {proofPoint.description}
                  {#if proofPoint.evidence}
                    <div class="evidence-note">Evidence: {proofPoint.evidence}</div>
                  {/if}
                </li>
              {/each}
            </ul>
            {#if dimension.proofPoints.filter(p => p.completed).length === 0}
              <p class="no-items">No proof points completed yet.</p>
            {/if}
          </div>

          {#if dimension.proofPoints.filter(p => p.notApplicable).length > 0}
            <div class="not-applicable-list">
              <h4>Not Applicable Proof Points:</h4>
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
        <h2>Overall Notes</h2>
        <p>{assessment.overallNotes}</p>
      </div>
    {/if}
  </div>

  <div class="action-buttons no-print">
    <button on:click={exportJSON} class="btn btn-secondary">
      📥 Export as JSON
    </button>
    <button on:click={exportPDF} class="btn btn-primary">
      🖨️ Print/Save as PDF
    </button>
  </div>
</section>

<style>
  .summary {
    background: white;
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
    color: #3498db;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0;
    transition: color 0.2s;
  }

  .btn-back:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 1.75rem;
    color: #2c3e50;
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ecf0f1;
  }

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    color: #34495e;
    margin: 1rem 0 0.5rem 0;
  }

  .report-info {
    background-color: #f8f9fa;
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
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .info-value {
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .overall-maturity {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 2rem;
  }

  .overall-maturity h2 {
    color: white;
    border: none;
    margin: 0 0 1rem 0;
  }

  .maturity-badge-large {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 1rem 0;
  }

  .maturity-explanation {
    margin-top: 1rem;
    opacity: 0.9;
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
    background-color: #34495e;
    color: white;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #ecf0f1;
  }

  tbody tr:hover {
    background-color: #f8f9fa;
  }

  .dimension-name {
    font-weight: 500;
    color: #2c3e50;
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
    background-color: #ecf0f1;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }

  .table-progress-bar {
    height: 100%;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: #7f8c8d;
  }

  .dimension-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  .dimension-stats-detail {
    margin-bottom: 1rem;
  }

  .dimension-stats-detail p {
    margin-bottom: 0.5rem;
    color: #555;
  }

  .dimension-notes {
    background-color: #fff3cd;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
  }

  .dimension-notes p {
    color: #856404;
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
    border-bottom: 1px solid #e9ecef;
  }

  .proof-points-detail li:last-child,
  .not-applicable-list li:last-child {
    border-bottom: none;
  }

  .evidence-note {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #e3f2fd;
    border-left: 3px solid #2196f3;
    font-size: 0.9rem;
    color: #0d47a1;
  }

  .no-items {
    color: #7f8c8d;
    font-style: italic;
  }

  .not-applicable-list {
    margin-top: 1rem;
  }

  .not-applicable-list h4 {
    color: #7f8c8d;
  }

  .not-applicable-list li {
    color: #7f8c8d;
  }

  .overall-notes {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #ecf0f1;
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
    background-color: #3498db;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .btn-secondary {
    background-color: #95a5a6;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #7f8c8d;
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

    h1 {
      font-size: 1.75rem;
    }

    h2 {
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
