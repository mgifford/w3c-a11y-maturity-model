<script lang="ts">
  import { MODEL } from '../lib/maturity';
</script>

<footer class="footer">
  <div class="container">
    <p>
      Based on the <a href={MODEL.url} target="_blank" rel="noopener noreferrer">
        {MODEL.name}
        <span class="sr-only">(opens in a new tab)</span>
      </a>, published by the {MODEL.publisher} as a {MODEL.version}. This tool was initially developed
      against that Group Note and now also follows the editor's draft through {MODEL.syncedThrough}.
    </p>
    <p>
      <small>
        This is an independent tool. It is not a W3C product and is not endorsed by W3C or its Members.
      </small>
    </p>
    <p>
      <small>
        Results are informational and advisory: not a conformance claim, audit, or certification.
        Answers are stored only in this browser.
      </small>
    </p>
    <p>
      <small>
        Open source, with contributions welcome on
        <a href="https://github.com/mgifford/w3c-a11y-maturity-model" target="_blank" rel="noopener noreferrer">
          GitHub
          <span class="sr-only">(opens in a new tab)</span>
        </a>.
      </small>
    </p>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-footer-bg);
    color: var(--color-footer-text);
    padding: 2rem 0;
    margin-top: 4rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
  }

  .footer a {
    color: var(--color-footer-link);
  }

  .footer p {
    margin-bottom: 0.5rem;
  }

  .footer small {
    color: var(--color-footer-text);
    font-size: 0.9rem;
  }
</style>
