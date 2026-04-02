import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Header from '../components/Header.svelte';
import { assessmentStore } from '../stores/assessmentStore';

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.clear();
    assessmentStore.reset();
    vi.restoreAllMocks();
  });

  it('renders the application title', () => {
    render(Header);
    
    expect(screen.getByRole('heading', { name: /w3c accessibility maturity model/i })).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(Header);
    
    expect(screen.getByText(/assessment tool/i)).toBeInTheDocument();
  });

  it('renders Export button', () => {
    render(Header);
    
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });

  it('renders Import button', () => {
    render(Header);
    
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument();
  });

  it('renders Share button', () => {
    render(Header);
    
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('does not show New Assessment button when no content exists', () => {
    render(Header);
    
    expect(screen.queryByRole('button', { name: /new assessment/i })).not.toBeInTheDocument();
  });

  it('shows New Assessment button when content exists', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    
    render(Header);
    
    expect(screen.getByRole('button', { name: /new assessment/i })).toBeInTheDocument();
  });

  it('nav has accessible label', () => {
    render(Header);
    
    const nav = screen.getByRole('navigation', { name: /main actions/i });
    expect(nav).toBeInTheDocument();
  });

  it('logo image has alt text', () => {
    render(Header);
    
    const logo = screen.getByRole('img', { name: /accessibility maturity model logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt');
  });

  it('Share button has aria-haspopup="dialog"', () => {
    render(Header);
    
    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('Share button toggles aria-expanded on click', async () => {
    render(Header);
    
    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toHaveAttribute('aria-expanded', 'false');
    
    await fireEvent.click(shareBtn);
    
    expect(shareBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking Share again collapses the panel', async () => {
    render(Header);
    
    const shareBtn = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareBtn);
    await fireEvent.click(shareBtn);
    
    expect(shareBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('Export button calls exportData and triggers download', async () => {
    const exportSpy = vi.spyOn(assessmentStore, 'exportData').mockReturnValue('{}');
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    
    render(Header);
    
    const exportBtn = screen.getByRole('button', { name: /export/i });
    await fireEvent.click(exportBtn);
    
    expect(exportSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('Reset button triggers confirmation dialog', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    
    render(Header);
    
    const resetBtn = screen.getByRole('button', { name: /new assessment/i });
    await fireEvent.click(resetBtn);
    
    expect(confirmSpy).toHaveBeenCalledWith(
      expect.stringContaining('Are you sure')
    );
  });

  it('Reset clears data when user confirms', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const resetSpy = vi.spyOn(assessmentStore, 'reset');
    
    render(Header);
    
    const resetBtn = screen.getByRole('button', { name: /new assessment/i });
    await fireEvent.click(resetBtn);
    
    expect(resetSpy).toHaveBeenCalled();
  });

  it('Reset does not clear data when user cancels', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const resetSpy = vi.spyOn(assessmentStore, 'reset');
    
    render(Header);
    
    const resetBtn = screen.getByRole('button', { name: /new assessment/i });
    await fireEvent.click(resetBtn);
    
    expect(resetSpy).not.toHaveBeenCalled();
  });
});
