<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { assessmentStore, hasContent } from '../stores/assessmentStore';
  import { themeStore } from '../stores/themeStore';
  import SocialShare from './SocialShare.svelte';
  import LogoUrl from '../assets/accessibility-maturity-model-logo.svg';
  import { MODEL } from '../lib/maturity';

  let shareOpen = false;
  let shareButton: HTMLButtonElement | null = null;
  let resetPending = false;
  let confirmButton: HTMLButtonElement | null = null;

  let statusMessage = '';
  let statusTone: 'info' | 'error' = 'info';

  function announce(message: string, tone: 'info' | 'error' = 'info') {
    // Clear first so an identical message is announced again.
    statusMessage = '';
    statusTone = tone;
    tick().then(() => {
      statusMessage = message;
    });
  }

  function toggleShare() {
    shareOpen = !shareOpen;
  }

  function closeShare() {
    shareOpen = false;
    shareButton?.focus();
  }

  onMount(() => {
    themeStore.init();
  });

  async function requestReset() {
    resetPending = true;
    await tick();
    confirmButton?.focus();
  }

  function cancelReset() {
    resetPending = false;
  }

  function handleReset() {
    assessmentStore.reset();
    resetPending = false;
    announce('New assessment started. Previous answers were cleared.');
  }

  function handleExport() {
    const data = assessmentStore.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `a11y-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    announce('Assessment data exported as a JSON file.');
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (assessmentStore.importData(content)) {
          announce('Assessment data imported.');
        } else {
          announce(
            'That file could not be read as assessment data. Choose a JSON file previously exported from this tool.',
            'error'
          );
        }
      };
      reader.onerror = () => {
        announce('The file could not be opened. Please try again.', 'error');
      };
      reader.readAsText(file);
    };
    input.click();
  }
</script>

<header class="site-header">
  <div class="container">
    <div class="brand">
      <img src={LogoUrl} alt="" class="logo" width="48" height="48" />
      <div class="titles">
        <h1>{MODEL.name}</h1>
        <p class="tagline">Assessment Tool</p>
      </div>
    </div>

    <div class="header-actions" role="group" aria-label="Assessment actions">
      <button on:click={handleExport} class="btn btn-secondary">
        <span aria-hidden="true">📥</span> Export
      </button>
      <button on:click={handleImport} class="btn btn-secondary">
        <span aria-hidden="true">📤</span> Import
      </button>
      {#if $hasContent}
        <button on:click={requestReset} class="btn btn-danger" aria-expanded={resetPending}>
          <span aria-hidden="true">🔄</span> New Assessment
        </button>
      {/if}
      <div class="share-wrapper">
        <button
          bind:this={shareButton}
          on:click={toggleShare}
          class="btn btn-secondary"
          id="share-trigger"
          aria-haspopup="dialog"
          aria-expanded={shareOpen}
          aria-controls="share-panel"
        >
          <span aria-hidden="true">🔗</span> Share
        </button>
        <SocialShare open={shareOpen} onClose={closeShare} />
      </div>
      <button
        on:click={themeStore.toggle}
        class="btn btn-theme-toggle"
        aria-pressed={$themeStore === 'dark'}
      >
        <span class="sr-only">Dark mode</span>
        <span aria-hidden="true">{$themeStore === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    </div>

    {#if resetPending}
      <div class="reset-confirm">
        <p>
          Start a new assessment? This clears the organization details and every answer stored in
          this browser.
        </p>
        <div class="reset-confirm-actions">
          <button bind:this={confirmButton} on:click={handleReset} class="btn btn-danger">
            Yes, start a new assessment
          </button>
          <button on:click={cancelReset} class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    {/if}

    {#if statusMessage}
      <p
        class="status-message"
        class:status-error={statusTone === 'error'}
        role={statusTone === 'error' ? 'alert' : 'status'}
      >
        {statusMessage}
      </p>
    {/if}
  </div>
</header>

<style>
  .site-header {
    background: linear-gradient(135deg, var(--color-header-bg-start) 0%, var(--color-header-bg-end) 100%);
    color: var(--color-header-text);
    padding: 2rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
    color: var(--color-header-text);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    display: block;
    flex: none;
  }

  .titles {
    display: flex;
    flex-direction: column;
  }

  .tagline {
    margin-top: 0.25rem;
    font-size: 1.1rem;
  }

  .header-actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .share-wrapper {
    position: relative;
  }

  .btn {
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
  }

  .btn-secondary {
    background-color: var(--color-btn-secondary-bg);
    color: #ffffff;
  }

  .btn-secondary:hover {
    background-color: var(--color-btn-secondary-hover);
  }

  .btn-danger {
    background-color: var(--color-btn-danger-bg);
    color: #ffffff;
  }

  .btn-danger:hover {
    background-color: var(--color-btn-danger-hover);
  }

  .btn-theme-toggle {
    background-color: transparent;
    color: var(--color-header-text);
    border: 2px solid currentColor;
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-left: auto;
  }

  .btn-theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .reset-confirm {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: var(--color-surface);
    color: var(--color-text);
    border-left: 4px solid var(--color-btn-danger-bg);
    max-width: 42rem;
  }

  .reset-confirm-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .status-message {
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    border-left: 4px solid var(--color-focus-on-dark);
    background-color: rgba(255, 255, 255, 0.92);
    color: #1b2a38;
    border-radius: 4px;
    max-width: 42rem;
  }

  .status-error {
    border-left-color: var(--color-level-inactive);
    background-color: #ffffff;
    color: #7f1d1d;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }

    .brand {
      align-items: flex-start;
    }

    .logo {
      width: 40px;
      height: 40px;
    }

    .tagline {
      font-size: 1rem;
    }

    .header-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .btn,
    .btn-theme-toggle {
      width: 100%;
      justify-content: center;
      margin-left: 0;
    }
  }
</style>
