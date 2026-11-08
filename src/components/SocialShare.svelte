<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { assessmentStore, progress } from '../stores/assessmentStore';
  import { get } from 'svelte/store';

  export let open = false;
  export let onClose: () => void;

  let panel: HTMLDivElement | null = null;
  let closeButton: HTMLButtonElement | null = null;
  let canWebShare = false;
  let shareStatus = '';
  let mastodonInstance = '';
  let showMastoSetup = false;

  const siteTitle = 'Accessibility Maturity Model assessment';

  function currentUrl() {
    return window.location.href;
  }

  function shareText() {
    const p = get(progress);
    const a = get(assessmentStore);
    const org = a.organizationName?.trim();
    const prefix = org ? `${org} - ` : '';
    const pct = isFinite(p.percentage) ? Math.round(p.percentage) : 0;
    return `${prefix}${siteTitle} (${p.completed}/${p.total} dimensions assessed, ${pct}%).`;
  }

  async function handleWebShare() {
    try {
      await navigator.share({ title: siteTitle, text: shareText(), url: currentUrl() });
    } catch {
      // The user dismissed the share sheet; nothing to report.
    }
  }

  function enc(s: string) {
    return encodeURIComponent(s);
  }

  function shareHref(type: 'linkedin' | 'email' | 'bluesky') {
    const url = currentUrl();
    const text = shareText();
    switch (type) {
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;
      case 'email':
        return `mailto:?subject=${enc(siteTitle)}&body=${enc(text + '\n' + url)}`;
      case 'bluesky':
        return `https://bsky.app/intent/compose?text=${enc(text + ' ' + url)}`;
    }
  }

  function loadMastodonInstance() {
    try {
      const saved = localStorage.getItem('mastodonInstance');
      if (saved) mastodonInstance = saved;
    } catch {
      // Storage may be unavailable; the field simply starts empty.
    }
  }

  function saveMastodonInstance() {
    try {
      localStorage.setItem('mastodonInstance', mastodonInstance.trim());
    } catch {
      // Not fatal: the instance is still used for this share.
    }
  }

  function openMastodonShare() {
    const text = `${shareText()} ${currentUrl()}`;
    if (!mastodonInstance.trim()) {
      showMastoSetup = true;
      tick().then(() => panel?.querySelector<HTMLInputElement>('#masto-instance')?.focus());
      return;
    }
    const host = mastodonInstance.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    window.open(`https://${host}/share?text=${enc(text)}`, '_blank', 'noopener');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      shareStatus = 'Link copied to the clipboard.';
    } catch {
      shareStatus = 'The link could not be copied. Select the address bar to copy it manually.';
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (open && e.key === 'Escape') {
      onClose?.();
    }
  }

  $: if (open && panel) {
    tick().then(() => {
      const first = panel?.querySelector<HTMLElement>('a[href], button, input');
      first?.focus();
    });
  }

  onMount(() => {
    canWebShare = typeof navigator !== 'undefined' && !!(navigator as Navigator).share;
    loadMastodonInstance();
  });
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
  <div
    class="share-panel"
    id="share-panel"
    bind:this={panel}
    role="dialog"
    aria-labelledby="share-heading"
    tabindex="-1"
  >
    <h2 id="share-heading" class="sr-only">Share this tool</h2>

    {#if canWebShare}
      <button class="btn btn-primary full" on:click={handleWebShare}>
        <span aria-hidden="true">📣</span> Share via device
      </button>
    {/if}

    <div class="grid">
      <a class="share-link" href={shareHref('linkedin')} target="_blank" rel="noopener">
        <span aria-hidden="true">in</span> LinkedIn
      </a>
      <a class="share-link" href={shareHref('bluesky')} target="_blank" rel="noopener">
        <span aria-hidden="true">🌐</span> Bluesky
      </a>
      <a class="share-link" href={shareHref('email')}>
        <span aria-hidden="true">✉️</span> Email
      </a>
      <button class="share-link mastodon" on:click={openMastodonShare}>
        <span aria-hidden="true">🐘</span> Mastodon
      </button>
    </div>

    {#if showMastoSetup}
      <div class="masto-setup" role="group" aria-label="Mastodon instance setup">
        <label for="masto-instance">Your Mastodon server (for example, mastodon.social)</label>
        <div class="row">
          <input id="masto-instance" type="text" bind:value={mastodonInstance} />
          <button
            class="btn btn-primary"
            on:click={() => {
              saveMastodonInstance();
              openMastodonShare();
            }}>Share</button
          >
        </div>
      </div>
    {/if}

    <div class="copy-row">
      <button class="btn btn-secondary" on:click={copyLink}>
        <span aria-hidden="true">🔗</span> Copy link
      </button>
    </div>

    {#if shareStatus}
      <p class="share-status" role="status">{shareStatus}</p>
    {/if}

    <button bind:this={closeButton} class="btn close" on:click={() => onClose?.()}>Close</button>
  </div>
{/if}

<style>
  .share-panel {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.5rem;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.75rem;
    min-width: 15rem;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
    z-index: 1000;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .share-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    text-decoration: none;
    color: var(--color-text);
    justify-content: center;
    min-height: 44px;
    background: transparent;
    font-size: 1rem;
  }

  .share-link:hover {
    background: var(--color-surface-alt);
  }

  .copy-row {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
  }

  .btn {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
  }

  .btn-primary {
    background: var(--color-btn-secondary-bg);
    color: #ffffff;
  }

  .btn-primary:hover {
    background: var(--color-btn-secondary-hover);
  }

  .btn-secondary {
    background: var(--color-surface-alt);
    color: var(--color-text);
  }

  .btn.full {
    width: 100%;
    justify-content: center;
  }

  .btn.close {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
    background: var(--color-surface-alt);
    color: var(--color-text);
  }

  .share-status {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .masto-setup {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .masto-setup label {
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .masto-setup .row {
    display: flex;
    gap: 0.5rem;
  }

  .masto-setup input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    color: var(--color-text);
    min-height: 44px;
  }
</style>
