<script lang="ts">
  import { MODEL } from '../lib/maturity';

  /** When false the content is always visible, for use as a page's main content. */
  export let toggleable = true;

  let isExpanded = true;

  function toggleIntro() {
    isExpanded = !isExpanded;
  }
</script>

<section class="introduction" class:always-open={!toggleable} aria-labelledby="intro-heading">
  {#if toggleable}
    <h2 id="intro-heading">
      <button
        class="intro-toggle"
        on:click={toggleIntro}
        aria-expanded={isExpanded}
        aria-controls="intro-content"
      >
        <span>About the {MODEL.acronym}</span>
        <span class="toggle-icon" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
      </button>
    </h2>
  {:else}
    <h2 id="intro-heading" class="static-heading">About the {MODEL.acronym}</h2>
  {/if}

  {#if !toggleable || isExpanded}
    <div id="intro-content" class="intro-content">
      <p>
        The <strong>{MODEL.name} ({MODEL.acronym})</strong> is an adaptable framework for measuring how
        effectively an organization's operations produce and sustain accessible digital products and
        services. It looks at seven dimensions of an organization, each assessed against four maturity
        levels.
      </p>

      <h3>What this tool is, and is not</h3>
      <div class="disclosure">
        <p><strong>This tool is</strong></p>
        <ul>
          <li>
            an independent, unaffiliated assessment aid for the {MODEL.acronym}, published by the
            {' '}{MODEL.publisher} as a <strong>{MODEL.version}</strong>;
          </li>
          <li>
            initially developed against that Group Note, and since updated with the model's
            <strong>editor's draft</strong> changes published through <strong>{MODEL.syncedThrough}</strong>,
            so some content now goes beyond the Note. The draft is not final and may change again;
          </li>
          <li>a structured way to discuss how your organization produces and sustains accessible outcomes.</li>
        </ul>
        <p><strong>This tool is not</strong></p>
        <ul>
          <li>
            a W3C product, and it is not endorsed by W3C or its Members. The {MODEL.acronym} is a
            Group Note, not a W3C Recommendation or a standard;
          </li>
          <li>
            a conformance test, audit, certification, or compliance determination. Maturity assessment
            complements accessibility conformance testing; it does not replace it.
          </li>
        </ul>
        <p>
          <strong>Where this differs from the Group Note:</strong> the tool follows the draft. &ldquo;Oversight
          and Culture&rdquo; is shown as &ldquo;Governance and Oversight&rdquo; and is assessed second, and the proof
          points include the draft's Continuity additions.
        </p>
        <p>
          Results are informational and advisory. Final responsibility for interpretation,
          prioritization, and action rests with your organization and its accessibility experts.
        </p>
      </div>

      <h3>Why use this model?</h3>
      <ul>
        <li><strong>Structured assessment:</strong> consider your organization's maturity across seven dimensions</li>
        <li><strong>Shared language:</strong> compare dimensions without turning the result into a pass or fail</li>
        <li><strong>Progress tracking:</strong> follow advancement through four maturity levels: Inactive, Launch, Integrate, and Optimize</li>
        <li><strong>Planning:</strong> identify gaps and build a roadmap for improving accessibility</li>
        <li><strong>Communication:</strong> generate a summary you can discuss with leadership and stakeholders</li>
      </ul>

      <h3>Learn more</h3>
      <ul class="resource-links">
        <li>
          <a href={MODEL.url} target="_blank" rel="noopener noreferrer">
            {MODEL.name} Group Note
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={MODEL.editorDraftUrl} target="_blank" rel="noopener noreferrer">
            {MODEL.name} editor's draft
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href="https://www.w3.org/WAI/planning/statements/" target="_blank" rel="noopener noreferrer">
            Accessibility statements generator
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href="https://www.w3.org/WAI/fundamentals/" target="_blank" rel="noopener noreferrer">
            Accessibility fundamentals overview
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      </ul>

      <div class="quick-start">
        <h3>Getting started</h3>
        <ol>
          <li>Open the assessment and add your organization details</li>
          <li>Review each of the seven dimensions</li>
          <li>Record the status and evidence for each proof point</li>
          <li>Select the maturity level your evidence supports for each dimension</li>
          <li>Review the summary report and plan next steps</li>
        </ol>
        <p class="note">
          Levels are cumulative: a dimension reaches a higher level only once the outcomes at the lower
          levels are met. The {MODEL.acronym} defines maturity per dimension; it does not define an
          overall organizational score.
        </p>
      </div>
    </div>
  {/if}
</section>

<style>
  .introduction {
    background: linear-gradient(135deg, var(--color-intro-from) 0%, var(--color-intro-to) 100%);
    color: #ffffff;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0;
    color: #ffffff;
    font-size: 1.5rem;
  }

  .intro-toggle {
    width: 100%;
    background: none;
    border: none;
    padding: 1.5rem;
    cursor: pointer;
    color: #ffffff;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: inherit;
    border-radius: 8px;
  }

  .intro-toggle:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .toggle-icon {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
  }

  .intro-content {
    padding: 0 1.5rem 1.5rem;
  }

  .static-heading {
    padding: 1.5rem 1.5rem 0;
  }

  .always-open {
    margin-bottom: 2.5rem;
  }

  .always-open .intro-content {
    padding-top: 1rem;
  }

  .intro-content p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 68ch;
  }

  .intro-content h3 {
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.45);
    padding-bottom: 0.5rem;
    color: #ffffff;
  }

  .intro-content ul,
  .intro-content ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    max-width: 68ch;
  }

  .intro-content li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .disclosure {
    background-color: rgba(0, 0, 0, 0.22);
    border-radius: 8px;
    padding: 1rem 1.25rem;
    border-left: 4px solid #ffffff;
  }

  .disclosure p {
    margin-bottom: 0.5rem;
  }

  .disclosure ul {
    margin: 0.25rem 0 1rem;
  }

  .resource-links {
    list-style: none;
    padding-left: 0;
  }

  .resource-links a {
    color: var(--color-intro-link);
    font-weight: 600;
  }

  .resource-links a:hover {
    text-decoration-thickness: 3px;
  }

  .quick-start {
    background-color: rgba(0, 0, 0, 0.22);
    padding: 1rem 1.25rem;
    border-radius: 8px;
    margin-top: 1.5rem;
  }

  .quick-start h3 {
    margin-top: 0;
    border-bottom: none;
  }

  .quick-start .note {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .intro-toggle {
      font-size: 1.25rem;
    }

    .intro-content h3 {
      font-size: 1.1rem;
    }
  }
</style>
