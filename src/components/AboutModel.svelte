<script lang="ts">
  import { MODEL } from '../lib/maturity';
</script>

<section class="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About the model</h2>
  <p class="intro">
    The {MODEL.name} ({MODEL.acronym}) is a framework for measuring how effectively an organization
    produces and sustains accessible digital products and services. It looks at seven dimensions,
    each assessed against four maturity levels.
  </p>

  <h3>What this tool is, and is not</h3>
  <ul class="facts">
    <li>
      <strong>An independent assessment aid</strong> for the {MODEL.acronym}, published by the
      {MODEL.publisher} as a {MODEL.version}.
    </li>
    <li>
      <strong>Initially developed against that Group Note</strong>, and since updated with the
      editor's draft through {MODEL.syncedThrough}. “Oversight and Culture” now appears as
      “Governance and Oversight”, and the proof points include the draft's Continuity additions.
    </li>
    <li>
      <strong>Not a W3C product</strong>, and not endorsed by W3C or its Members. The {MODEL.acronym}
      is a Group Note, not a Recommendation or a standard.
    </li>
    <li>
      <strong>Not a conformance test, audit, certification, or compliance determination.</strong>
      Maturity assessment complements accessibility conformance testing; it does not replace it.
      Results are informational and advisory.
    </li>
  </ul>

  <p class="more">
    More detail:
    <a href={MODEL.url} target="_blank" rel="noopener noreferrer">
      the Group Note
      <span class="sr-only">(opens in a new tab)</span>
    </a>
    or
    <a href={MODEL.editorDraftUrl} target="_blank" rel="noopener noreferrer">
      the current editor's draft
      <span class="sr-only">(opens in a new tab)</span>
    </a>.
  </p>
</section>

<style>
  .about {
    background-color: var(--color-surface);
    border: 1px solid var(--color-card-border);
    border-radius: 8px;
    padding: 1.75rem;
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.15rem;
    margin: 1.5rem 0 0.75rem;
  }

  .intro {
    max-width: 65ch;
  }

  .facts {
    max-width: 65ch;
    padding-left: 1.25rem;
  }

  .facts li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .more {
    margin-top: 1.25rem;
    margin-bottom: 0;
    color: var(--color-text-muted);
  }
</style>
