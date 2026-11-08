<script lang="ts">
  import { MODEL } from '../lib/maturity';
</script>

<section class="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About this tool</h2>
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
</section>

<style>
  .about {
    background-color: var(--color-surface-alt);
    border-left: 4px solid var(--color-accent-blue);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .facts {
    max-width: 68ch;
    padding-left: 1.25rem;
    margin: 0;
  }

  .facts li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .facts li:last-child {
    margin-bottom: 0;
  }
</style>
