<script lang="ts">
  import { assessmentStore } from '../stores/assessmentStore';

  let organizationName = '';
  let assessorInput = '';
  let assessors: string[] = [];

  assessmentStore.subscribe(assessment => {
    organizationName = assessment.organizationName;
    assessors = assessment.assessors;
  });

  function handleSave() {
    assessmentStore.updateOrganizationInfo(organizationName, assessors);
  }

  function addAssessor() {
    if (assessorInput.trim()) {
      assessors = [...assessors, assessorInput.trim()];
      assessorInput = '';
      handleSave();
    }
  }

  function removeAssessor(index: number) {
    assessors = assessors.filter((_, i) => i !== index);
    handleSave();
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addAssessor();
    }
  }
</script>

<section class="organization-info" aria-labelledby="org-info-heading">
  <h2 id="org-info-heading">Organization Information</h2>
  
  <div class="form-group">
    <label for="org-name">
      Organization Name <span class="required">*</span>
    </label>
    <input
      id="org-name"
      type="text"
      bind:value={organizationName}
      on:blur={handleSave}
      placeholder="Enter your organization name"
      class="input"
      required
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="assessor-input">Assessment Team Members</label>
    <div class="assessor-input-group">
      <input
        id="assessor-input"
        type="text"
        bind:value={assessorInput}
        on:keypress={handleKeyPress}
        placeholder="Add team member name"
        class="input"
        aria-describedby="assessor-help"
      />
      <button 
        on:click={addAssessor} 
        class="btn btn-add"
        aria-label="Add team member"
      >
        Add
      </button>
    </div>
    <p id="assessor-help" class="help-text">
      Press Enter or click Add to include a team member
    </p>
  </div>

  {#if assessors.length > 0}
    <div class="assessors-list" role="list" aria-label="Assessment team members">
      {#each assessors as assessor, index}
        <div class="assessor-tag" role="listitem">
          <span>{assessor}</span>
          <button
            on:click={() => removeAssessor(index)}
            class="remove-btn"
            aria-label="Remove {assessor}"
            title="Remove {assessor}"
          >
            ×
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .organization-info {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  .required {
    color: #e74c3c;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .input:hover {
    border-color: #bbb;
  }

  .input:focus {
    border-color: #3498db;
  }

  .assessor-input-group {
    display: flex;
    gap: 0.5rem;
  }

  .assessor-input-group .input {
    flex: 1;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-add {
    background-color: #27ae60;
    color: white;
  }

  .btn-add:hover {
    background-color: #229954;
  }

  .help-text {
    font-size: 0.875rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
  }

  .assessors-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .assessor-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #ecf0f1;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #e74c3c;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .remove-btn:hover {
    background-color: rgba(231, 76, 60, 0.1);
  }

  @media (max-width: 768px) {
    .organization-info {
      padding: 1.5rem;
    }

    .assessor-input-group {
      flex-direction: column;
    }

    .btn-add {
      width: 100%;
    }
  }
</style>
