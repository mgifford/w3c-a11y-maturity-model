import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import SocialShare from '../components/SocialShare.svelte';
import { assessmentStore } from '../stores/assessmentStore';

describe('SocialShare Component', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
    onClose.mockClear();
    // Reset window.location for URL tests
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost:3000/' },
      writable: true,
    });
  });

  it('does not render when open is false', () => {
    render(SocialShare, { props: { open: false, onClose } });
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the share panel when open is true', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('share panel has accessible aria-label', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Share this tool');
  });

  it('renders LinkedIn share link', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener');
  });

  it('renders Bluesky share link', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const blueskyLink = screen.getByRole('link', { name: /bluesky/i });
    expect(blueskyLink).toBeInTheDocument();
    expect(blueskyLink).toHaveAttribute('href', expect.stringContaining('bsky.app'));
  });

  it('renders Email share link', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'));
  });

  it('renders Mastodon share button', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const mastodonBtn = screen.getByRole('button', { name: /mastodon/i });
    expect(mastodonBtn).toBeInTheDocument();
  });

  it('renders Copy link button', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
  });

  it('renders Close button', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('Close button calls onClose', async () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    await fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    expect(onClose).toHaveBeenCalled();
  });

  it('Escape key calls onClose when panel is open', async () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    await fireEvent.keyDown(window, { key: 'Escape' });
    
    expect(onClose).toHaveBeenCalled();
  });

  it('Escape key does not call onClose when panel is closed', async () => {
    render(SocialShare, { props: { open: false, onClose } });
    
    await fireEvent.keyDown(window, { key: 'Escape' });
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('Mastodon button shows instance setup when no instance saved', async () => {
    // Clear any saved instance
    localStorage.removeItem('mastodonInstance');
    
    render(SocialShare, { props: { open: true, onClose } });
    
    const mastodonBtn = screen.getByRole('button', { name: /mastodon/i });
    await fireEvent.click(mastodonBtn);
    
    expect(screen.getByRole('group', { name: /mastodon instance setup/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your\.instance/i)).toBeInTheDocument();
  });

  it('shows instance setup input with label', async () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const mastodonBtn = screen.getByRole('button', { name: /mastodon/i });
    await fireEvent.click(mastodonBtn);
    
    expect(screen.getByLabelText(/enter your mastodon server/i)).toBeInTheDocument();
  });

  it('copy link button shows "Copied!" feedback after click', async () => {
    // jsdom may not have clipboard API; mock it if needed
    const mockClipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.defineProperty(navigator, 'clipboard', { value: mockClipboard, writable: true, configurable: true });
    
    render(SocialShare, { props: { open: true, onClose } });
    
    const copyBtn = screen.getByRole('button', { name: /copy link/i });
    await fireEvent.click(copyBtn);
    
    expect(await screen.findByText(/copied!/i)).toBeInTheDocument();
  });

  it('LinkedIn link includes current URL', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const href = linkedinLink.getAttribute('href') || '';
    expect(decodeURIComponent(href)).toContain('localhost');
  });

  it('Bluesky link includes share text', () => {
    render(SocialShare, { props: { open: true, onClose } });
    
    const blueskyLink = screen.getByRole('link', { name: /bluesky/i });
    const href = blueskyLink.getAttribute('href') || '';
    expect(href).toContain('text=');
  });

  it('loads saved Mastodon instance from localStorage', () => {
    localStorage.setItem('mastodonInstance', 'mastodon.social');
    
    render(SocialShare, { props: { open: true, onClose } });
    
    // Verify the component loaded without error
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
