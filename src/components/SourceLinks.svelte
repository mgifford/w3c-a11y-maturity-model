<script lang="ts">
  import { MODEL } from '../lib/maturity';

  const sources = [
    {
      href: MODEL.url,
      title: 'Accessibility Maturity Model — W3C Group Note',
      description:
        'The authoritative description of the seven dimensions, their proof points, and the four maturity levels (4 November 2025).'
    },
    {
      href: MODEL.editorDraftUrl,
      title: "Editor's draft",
      description: `Changes in progress. This tool follows the draft through ${MODEL.syncedThrough}.`
    },
    {
      href: MODEL.spreadsheetUrl,
      title: 'Assessment spreadsheet',
      description:
        "The task force's experimental prototype, with one sheet per dimension."
    },
    {
      href: MODEL.repoUrl,
      title: 'Source repository',
      description: 'Where the model is written and edited, in public.'
    },
    {
      href: MODEL.issuesUrl,
      title: 'Issues and comments',
      description: 'The place to raise a question about the model, or to follow the discussion.'
    },
    {
      href: MODEL.workingGroupUrl,
      title: 'APA Working Group',
      description: 'The W3C group that publishes the model.'
    }
  ];
</script>

<section class="sources" aria-labelledby="sources-heading">
  <h2 id="sources-heading">Start with the source</h2>
  <p class="lead">
    The {MODEL.name} ({MODEL.acronym}) is a W3C framework for measuring how effectively an
    organization produces and sustains accessible digital products and services. This tool is one way
    in; these are the primary sources.
  </p>

  <ul class="source-list">
    {#each sources as source}
      <li>
        <a href={source.href} target="_blank" rel="noopener noreferrer">
          {source.title}
          <span class="sr-only">(opens in a new tab)</span>
        </a>
        <p>{source.description}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  .sources {
    margin-bottom: 2.5rem;
  }

  h2 {
    margin-bottom: 0.75rem;
  }

  .lead {
    max-width: 65ch;
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
  }

  .source-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
  }

  .source-list li {
    background: var(--color-surface);
    border: 1px solid var(--color-card-border);
    border-radius: 8px;
    padding: 1rem 1.25rem;
  }

  .source-list a {
    font-weight: 600;
  }

  .source-list p {
    margin: 0.35rem 0 0;
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }
</style>
