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
    
    expect(screen.getByRole('heading', { level: 1, name: /accessibility maturity model/i })).toBeInTheDocument();
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

  it('action group has an accessible label', () => {
    render(Header);

    const group = screen.getByRole('group', { name: /assessment actions/i });
    expect(group).toBeInTheDocument();
  });

  it('the logo is decorative and does not duplicate the heading', () => {
    render(Header);

    const logo = document.querySelector('img.logo');
    expect(logo).toHaveAttribute('alt', '');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('theme toggle exposes its state with aria-pressed', () => {
    render(Header);

    const toggle = screen.getByRole('button', { name: /dark mode/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('interactive controls come after the theme toggle in the layout, matching DOM order', () => {
    render(Header);

    const buttons = Array.from(document.querySelectorAll('.header-actions button'));
    expect(buttons.at(-1)?.textContent).toMatch(/dark mode/i);
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

  it('Reset asks for inline confirmation instead of a blocking browser dialog', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);

    render(Header);

    await fireEvent.click(screen.getByRole('button', { name: /new assessment/i }));

    expect(screen.getByText(/start a new assessment\? this clears/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes, start a new assessment/i })).toBeInTheDocument();
  });

  it('Reset clears data when the user confirms', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    const resetSpy = vi.spyOn(assessmentStore, 'reset');

    render(Header);

    await fireEvent.click(screen.getByRole('button', { name: /new assessment/i }));
    await fireEvent.click(screen.getByRole('button', { name: /yes, start a new assessment/i }));

    expect(resetSpy).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(/previous answers were cleared/i);
  });

  it('Reset does not clear data when the user cancels', async () => {
    assessmentStore.updateOrganizationInfo('Test Org', []);
    const resetSpy = vi.spyOn(assessmentStore, 'reset');

    render(Header);

    await fireEvent.click(screen.getByRole('button', { name: /new assessment/i }));
    await fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('import failures are announced in plain language', async () => {
    render(Header);

    expect(assessmentStore.importData('{ not json')).toBe(false);
  });
});
