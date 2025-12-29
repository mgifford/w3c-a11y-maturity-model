<script lang="ts">
  import { onMount } from 'svelte';
  import { assessmentStore, progress } from '../stores/assessmentStore';
  import { get } from 'svelte/store';

  export let open = false;
  export let onClose: () => void;

  let panel: HTMLDivElement | null = null;
  let canWebShare = false;
  let copied = false;
  let mastodonInstance: string = '';
  let showMastoSetup = false;

  const siteTitle = 'W3C Accessibility Maturity Model';
  const siteDesc = 'Assess and discuss accessibility maturity across people, process, and technology.';

  function currentUrl() {
    return window.location.href;
  }

  function shareText() {
    const p = get(progress);
    const a = get(assessmentStore);
    const org = a.organizationName?.trim();
    const prefix = org ? `${org} – ` : '';
    const pct = isFinite(p.percentage) ? Math.round(p.percentage) : 0;
    return `${prefix}${siteTitle} assessment (${p.completed}/${p.total}, ${pct}%). ${siteDesc}`;
  }

  async function handleWebShare() {
    try {
      await navigator.share({ title: siteTitle, text: shareText(), url: currentUrl() });
    } catch (e) {
      // User cancelled or API not available; do nothing.
    }
  }

  function enc(s: string) { return encodeURIComponent(s); }

  function shareHref(type: 'linkedin'|'email'|'bluesky') {
    const url = currentUrl();
    const text = shareText();
    switch (type) {
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;
      case 'email':
        return `mailto:?subject=${enc(siteTitle)}&body=${enc(text + '\n' + url)}`;
      case 'bluesky':
        // Bluesky intent supports text param; include URL in text
        return `https://bsky.app/intent/compose?text=${enc(text + ' ' + url)}`;
    }
  }

  function loadMastodonInstance() {
    try {
      const saved = localStorage.getItem('mastodonInstance');
      if (saved) mastodonInstance = saved;
    } catch {}
  }

  function saveMastodonInstance() {
    try { localStorage.setItem('mastodonInstance', mastodonInstance.trim()); } catch {}
  }

  function openMastodonShare() {
    const text = `${shareText()} ${currentUrl()}`;
    if (!mastodonInstance.trim()) {
      showMastoSetup = true;
      return;
    }
    const host = mastodonInstance.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${host}/share?text=${enc(text)}`;
    window.open(url, '_blank', 'noopener');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (e) {
      // no-op
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose?.();
    }
  }

  onMount(() => {
    canWebShare = typeof navigator !== 'undefined' && !!(navigator as any).share;
    loadMastodonInstance();
  });
</script>

{#if open}
  <div class="share-panel" bind:this={panel} on:keydown={onKeydown} role="dialog" aria-label="Share this tool">
    {#if canWebShare}
      <button class="btn btn-primary full" on:click={handleWebShare} title="Share using your device">
        <span aria-hidden="true">📣</span> Share via device
      </button>
    {/if}

    <div class="grid">
      <a class="share-link linkedin" href={shareHref('linkedin')} target="_blank" rel="noopener" title="Share on LinkedIn">
        <span aria-hidden="true">in</span> LinkedIn
      </a>
      <a class="share-link bluesky" href={shareHref('bluesky')} target="_blank" rel="noopener" title="Share on Bluesky">
        <span aria-hidden="true">🌐</span> Bluesky
      </a>
      <a class="share-link email" href={shareHref('email')} title="Share via email">
        <span aria-hidden="true">✉️</span> Email
      </a>
      <button class="share-link mastodon" on:click={openMastodonShare} title="Share on Mastodon">
        <span aria-hidden="true">🐘</span> Mastodon
      </button>
    </div>

    {#if showMastoSetup}
      <div class="masto-setup" role="group" aria-label="Mastodon instance setup">
        <label for="masto-instance">Enter your Mastodon server (e.g., mastodon.social):</label>
        <div class="row">
          <input id="masto-instance" type="text" bind:value={mastodonInstance} placeholder="your.instance" />
          <button class="btn btn-primary" on:click={() => { saveMastodonInstance(); openMastodonShare(); }}>Share</button>
        </div>
      </div>
    {/if}

    <div class="copy-row">
      <button class="btn btn-secondary" on:click={copyLink} title="Copy link to clipboard">
        <span aria-hidden="true">🔗</span> {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>

    <button class="btn close" on:click={() => onClose?.()} title="Close share panel">Close</button>
  </div>
{/if}

<style>
  .share-panel {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.5rem;
    background: #fff;
    color: #2c3e50;
    border: 1px solid #e1e5ea;
    border-radius: 8px;
    padding: 0.75rem;
    min-width: 260px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.15);
    z-index: 1000;
  }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem; }
  .share-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid #e1e5ea;
    text-decoration: none;
    color: inherit;
    justify-content: center;
  }
  .share-link.mastodon { background: #f6f8fa; }
  .share-link:hover { background: #f7f9fb; }
  .share-link:hover { background: #f7f9fb; }
  .linkedin { font-weight: 700; }
  .bluesky { font-weight: 700; }
  .email { font-weight: 500; }

  .copy-row { margin-top: 0.5rem; display: flex; justify-content: center; }

  .btn { 
    padding: 0.5rem 0.75rem; 
    border: none; border-radius: 6px; 
    cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; 
  }
  .btn-primary { background: #3498db; color: #fff; }
  .btn-secondary { background: #ecf0f1; color: #2c3e50; }
  .btn.full { width: 100%; justify-content: center; }
  .btn.close { width: 100%; justify-content: center; margin-top: 0.5rem; background: #f0f3f6; }

  .masto-setup { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .masto-setup .row { display: flex; gap: 0.5rem; }
  .masto-setup input { flex: 1; padding: 0.5rem; border: 1px solid #e1e5ea; border-radius: 6px; }
</style>
